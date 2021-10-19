#!/usr/bin/env bash

rm cjs esm -rf

npx babel src --out-dir cjs
ESM=true npx babel src --out-dir esm

cp src/hooks/*.d.ts cjs/hooks
cp src/hooks/*.d.ts esm/hooks