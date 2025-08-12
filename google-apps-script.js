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
    try {
      const slackResponse = UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(slackMessage),
        muteHttpExceptions: true
      });
      
      const responseCode = slackResponse.getResponseCode();
      const responseText = slackResponse.getContentText();
      
      if (responseCode !== 200) {
        console.error('Slack error:', responseCode, responseText);
        throw new Error(`Slack returned ${responseCode}: ${responseText}`);
      }
      
      // 성공 응답
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'success',
          'message': '상담 신청이 완료되었습니다!',
          'slack_response': responseText
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (slackError) {
      console.error('Slack send failed:', slackError);
      
      // Slack 전송 실패해도 일단 성공으로 처리 (데이터는 받았으므로)
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'partial_success',
          'message': '상담 신청은 접수되었으나 Slack 전송에 실패했습니다.',
          'slack_error': slackError.toString(),
          'received_data': data
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

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

// 간단한 Slack 테스트
function simpleSlackTest() {
  try {
    // URL 직접 하드코딩
    const WEBHOOK = 'https://hooks.slack.com/services/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';
    
    console.log('Using Webhook URL:', WEBHOOK);
    console.log('URL Length:', WEBHOOK.length);
    
    const testMessage = {
      "text": "Google Apps Script Test Message"
    };
    
    const response = UrlFetchApp.fetch(WEBHOOK, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(testMessage),
      muteHttpExceptions: true
    });
    
    console.log('Response code:', response.getResponseCode());
    console.log('Response text:', response.getContentText());
    
    if (response.getResponseCode() === 200) {
      console.log('✅ Slack 전송 성공!');
      return 'Success';
    } else {
      console.log('❌ Slack 전송 실패');
      return 'Failed';
    }
  } catch (error) {
    console.error('Error:', error.toString());
    return error.toString();
  }
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