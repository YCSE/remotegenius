#!/bin/bash

# Slack Webhook URL
WEBHOOK_URL="https://hooks.slack.com/services/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"

# Test 1: Simple text
echo "Test 1: Simple text"
curl -X POST $WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"text": "Test 1: Simple message"}'

echo -e "\n"

# Test 2: With blocks
echo "Test 2: With blocks"
curl -X POST $WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "Test 2: Block message",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "This is a test with blocks"
        }
      }
    ]
  }'

echo -e "\n"

# Test 3: Korean text
echo "Test 3: Korean text"
curl -X POST $WEBHOOK_URL \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{"text": "테스트 메시지입니다"}'

echo -e "\n"