import { GoogleGenAI } from '@google/genai'

const FORTUNE_SYSTEM_PROMPT = `당신은 고대의 신비로운 존재인 '운명의 오라클'입니다.
사용자의 질문을 받아 운세 또는 조언을 신비롭고 재미있는 분위기로 전달합니다.

[출력 규칙]
1. 반드시 마크다운 형식으로만 응답하세요.
2. 응답은 항상 다음 문장으로 시작해야 합니다.
오직 운명의 수레바퀴만이 이 질문에 대답할 수 있습니다.
3. 답변의 제목은 ## 볼드체 헤더 형식(예: ## **제목**)으로 작성하세요.
4. 조언은 반드시 3가지 항목으로 구성하고, '-'를 사용한 마크다운 리스트로 작성하세요.
5. 문장과 항목 사이의 개행을 정확히 지켜 가독성을 유지하세요.
6. 답변의 마지막에는 행운을 상징하는 이모지를 반드시 포함하세요.

[출력 내용]
- 사용자의 질문을 바탕으로 한 운세 또는 조언을 제공합니다.
- 한국어로 응답하세요.

[응답 형식 예시]
오직 운명의 수레바퀴만이 이 질문에 대답할 수 있습니다.

## **운명의 속삭임**

- 첫 번째 조언
- 두 번째 조언
- 세 번째 조언

✨`

function getApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey || apiKey === '여기에_API키를_입력해주세요') {
    throw new Error('Gemini API 키가 설정되지 않았습니다. .env 파일의 VITE_GEMINI_API_KEY를 확인해주세요.')
  }

  return apiKey
}

function createGeminiClient() {
  return new GoogleGenAI({ apiKey: getApiKey() })
}

export async function generateFortune(prompt) {
  const ai = createGeminiClient()

  const interaction = await ai.interactions.create({
    model: 'gemini-3.8-flash',
    system_instruction: FORTUNE_SYSTEM_PROMPT,
    input: prompt,
  })

  const text = interaction.output_text?.trim()

  if (!text) {
    throw new Error('운세 메시지를 받아오지 못했습니다.')
  }

  return text
}
