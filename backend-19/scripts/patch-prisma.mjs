import { readFileSync, writeFileSync } from 'fs'

const file = './src/generated/internal/class.ts'
let content = readFileSync(file, 'utf8')

content = content
  .replace(/query_compiler_fast_bg\.postgresql\.mjs/g, 'query_compiler_bg.postgresql.mjs')
  .replace(/query_compiler_fast_bg\.postgresql\.wasm-base64\.mjs/g, 'query_compiler_bg.postgresql.mjs')
  .replace(/query_compiler_fast_bg\.js/g, 'query_compiler_bg.js')

writeFileSync(file, content)
console.log('Patched prisma generated client runtime imports')
