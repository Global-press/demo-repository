name: Auto-Promote News with Gemini Captions

on:
  schedule:
    - cron: '0 * * * *' # every hour
  workflow_dispatch:

jobs:
  promote-news:
    runs-on: ubuntu-latest
    env:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install node-fetch

      - name: Fetch latest news (example)
        run: |
          curl https://newsapi.org/v2/top-headlines?... > news.json
        # Replace above with your actual news source/API

      - name: Generate captions with Gemini
        run: node promoteNews.js

      - name: Commit and push captions
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add promotions/social-captions.json logs/gemini-fallback.json
          git commit -m "chore: Auto-generated Gemini news captions"
          git push
