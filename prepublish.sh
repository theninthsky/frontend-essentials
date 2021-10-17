#!/usr/bin/env bash

rm dist -rf
npx babel src --out-dir dist
cp src/hooks/*.d.ts dist/hooks