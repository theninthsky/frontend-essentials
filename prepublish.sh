#!/usr/bin/env bash

rm cjs esm -rf
BROWSERSLIST_ENV=cjs npx babel src --out-dir cjs
BROWSERSLIST_ENV=esm npx babel src --out-dir esm
cp src/hooks/*.d.ts cjs/hooks
cp src/hooks/*.d.ts esm/hooks