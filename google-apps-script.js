const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

function doPost(e) {
  try {
    // 폼 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // Slack 메시지 생성
    const slackMessage = {
      "text": "🎉 새로운 상담 신청이 접수되었습니다!",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "🚀 Remote Genius 상담 신청"
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*회사명:*\n${data.company || '미입력'}`
            },
            {
              "type": "mrkdwn",
              "text": `*담당자:*\n${data.name}`
            },
            {
              "type": "mrkdwn",
              "text": `*직책:*\n${data.position || '미입력'}`
            },
            {
              "type": "mrkdwn",
              "text": `*연락처:*\n${data.phone}`
            },
            {
              "type": "mrkdwn",
              "text": `*이메일:*\n${data.email || '미입력'}`
            },
            {
              "type": "mrkdwn",
              "text": `*필요 직무:*\n${data.jobs || '미선택'}`
            },
            {
              "type": "mrkdwn",
              "text": `*긴급도:*\n${data.urgency || '미정'}`
            },
            {
              "type": "mrkdwn",
              "text": `*채용 인원:*\n${data.headcount || '미정'}`
            },
            {
              "type": "mrkdwn",
              "text": `*예산:*\n${data.budget || '협의'}`
            },
            {
              "type": "mrkdwn",
              "text": `*고용 기간:*\n${data.period || '미정'}`
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*프로젝트 설명:*\n${data.description || '없음'}`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*필요 기술:*\n${data.skills || '미입력'}`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `📅 접수 시간: ${data.timestamp || new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}`
            }
          ]
        }
      ]
    };

    // Slack으로 전송
    UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(slackMessage)
    });

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': '상담 신청이 완료되었습니다!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // 에러 처리
    console.error('Error:', error);

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': '처리 중 오류가 발생했습니다.',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet() {
  return ContentService
    .createTextOutput('Remote Genius Form Handler is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}