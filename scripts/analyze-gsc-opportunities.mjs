#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);

function printUsage() {
  console.log([
    'Usage:',
    '  node scripts/analyze-gsc-opportunities.mjs --queries <queries.csv> --pages <pages.csv>',
    '',
    'Expected GSC exports:',
    '  - queries: Performance > Queries export',
    '  - pages: Performance > Pages export',
    '',
    'Supported formats: CSV or TSV. Export CSV from GSC if possible.',
  ].join('\n'));
}

function getArg(name) {
  const index = args.indexOf(name);
  if (index === -1) return '';
  return args[index + 1] ?? '';
}

function parseDelimited(text) {
  const delimiter = text.includes('\t') ? '\t' : ',';
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (!quoted && char === delimiter) {
      row.push(field);
      field = '';
      continue;
    }

    if (!quoted && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function normalizeHeader(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\uFEFF/, '')
    .replace(/\s+/g, ' ');
}

function findColumn(headers, candidates) {
  const normalized = headers.map(normalizeHeader);
  for (const candidate of candidates) {
    const index = normalized.indexOf(candidate);
    if (index !== -1) return index;
  }
  return -1;
}

function parseNumber(value) {
  const cleaned = String(value ?? '')
    .replace(/[%,$\s]/g, '')
    .replace(/,/g, '')
    .trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readGscCsv(file, kind) {
  if (!file) return [];
  const ext = path.extname(file).toLowerCase();
  if (!['.csv', '.tsv', '.txt'].includes(ext)) {
    throw new Error(`Unsupported file format for ${file}. Please export CSV or TSV from GSC.`);
  }

  const rows = parseDelimited(fs.readFileSync(file, 'utf8'));
  if (rows.length < 2) return [];

  const headers = rows[0];
  const keyIndex = findColumn(headers, kind === 'queries'
    ? ['top queries', 'query', 'queries', 'search query', '查询', '查询数', '热门查询']
    : ['top pages', 'page', 'pages', 'url', '网页', '页面', '排名靠前的网页']);
  const clicksIndex = findColumn(headers, ['clicks', '点击次数', '点击']);
  const impressionsIndex = findColumn(headers, ['impressions', '展示次数', '曝光', '展示']);
  const ctrIndex = findColumn(headers, ['ctr', '点击率']);
  const positionIndex = findColumn(headers, ['position', 'avg. position', 'average position', '排名', '平均排名']);

  if (keyIndex === -1 || impressionsIndex === -1 || positionIndex === -1) {
    throw new Error(`Could not identify required columns in ${file}. Need key, impressions, and position columns.`);
  }

  return rows.slice(1)
    .map((row) => {
      const impressions = parseNumber(row[impressionsIndex]);
      const clicks = clicksIndex === -1 ? 0 : parseNumber(row[clicksIndex]);
      const position = parseNumber(row[positionIndex]);
      const ctrRaw = ctrIndex === -1 ? 0 : parseNumber(row[ctrIndex]);
      const ctr = ctrRaw > 1 ? ctrRaw / 100 : ctrRaw;

      return {
        kind,
        key: row[keyIndex]?.trim() ?? '',
        clicks,
        impressions,
        ctr,
        position,
      };
    })
    .filter((row) => row.key && row.impressions > 0 && row.position > 0);
}

function score(row) {
  const rankOpportunity = row.position >= 8 && row.position <= 20 ? 1 : 0.35;
  const impressionWeight = Math.log10(row.impressions + 10);
  const ctrGap = Math.max(0.002, 0.025 - row.ctr);
  return rankOpportunity * impressionWeight * ctrGap * 1000;
}

function classify(row) {
  if (row.position >= 8 && row.position <= 20 && row.impressions >= 100) return 'P1';
  if (row.position > 20 && row.position <= 40 && row.impressions >= 300) return 'P2';
  if (row.position < 8 && row.ctr < 0.01 && row.impressions >= 100) return 'CTR';
  return 'watch';
}

function printTable(title, rows) {
  console.log(`\n${title}`);
  console.log('priority\timpressions\tclicks\tctr\tposition\titem');
  for (const row of rows) {
    console.log([
      classify(row),
      row.impressions,
      row.clicks,
      `${(row.ctr * 100).toFixed(2)}%`,
      row.position.toFixed(1),
      row.key,
    ].join('\t'));
  }
}

try {
  const queriesFile = getArg('--queries');
  const pagesFile = getArg('--pages');

  if (!queriesFile && !pagesFile) {
    printUsage();
    process.exit(0);
  }

  const queries = readGscCsv(queriesFile, 'queries')
    .sort((a, b) => score(b) - score(a));
  const pages = readGscCsv(pagesFile, 'pages')
    .sort((a, b) => score(b) - score(a));

  if (queries.length) {
    printTable('Top query opportunities', queries.slice(0, 40));
  }

  if (pages.length) {
    printTable('Top page opportunities', pages.slice(0, 40));
  }

  console.log('\nNext action: optimize P1 rows first: title, H1/direct answer, intro paragraph, internal links, and page-specific information gain.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
