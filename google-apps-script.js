const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

function doPost(e) {
  try {
    // 요청 확인
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'message': '잘못된 요청입니다.',
          'debug': 'No postData received'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'running',
      'message': 'Remote Genius Form Handler is running!',
      'deployment': 'Web app is properly deployed',
      'timestamp': new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 테스트 함수
function testSlackWebhook() {
  const testData = {
    timestamp: new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}),
    company: '테스트 회사',
    name: '테스트 담당자',
    position: '대표',
    phone: '010-1234-5678',
    email: 'test@example.com',
    jobs: '웹 개발자, 디자이너',
    urgency: '즉시',
    headcount: '2명',
    budget: '300만원',
    period: '6개월',
    description: '테스트 프로젝트 설명',
    skills: 'React, Node.js'
  };
  
  // doPost 함수 테스트
  const fakeEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(fakeEvent);
  console.log(result.getContent());
}