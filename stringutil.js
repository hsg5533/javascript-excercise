/**
 * 문자열이 특정 단어로 시작하는지 확인
 * @param str 문자열
 * @param word 비교할 단어
 * @returns 시작하면 true, 그렇지 않으면 false
 * @example startsWith('hello world', 'hello') // true
 */
function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}
/**
 * 문자열이 특정 단어로 끝나는지 확인
 * @param str 문자열
 * @param word 비교할 단어
 * @returns 끝나면 true, 그렇지 않으면 false
 * @example endsWith('hello world', 'world') // true
 */
function endsWith(str, word) {
    return str.indexOf(word, str.length - word.length) !== -1;
}
/**
 * 문자열을 특정 횟수만큼 반복
 * @param str 반복할 문자열
 * @param len 반복 횟수
 * @returns 반복된 문자열
 * @example repeatString('abc', 3) // 'abcabcabc'
 */
function repeatString(str, len) {
    let s = "";
    let i = 0;
    while (i++ < len) {
        s += str;
    }
    return s;
}
/**
 * 문자열의 '{}' 부분을 값을 대입하여 포맷
 * @param str 포맷할 문자열
 * @param values 대입할 값들
 * @returns 포맷된 문자열
 * @example formatString('{} is {} years old', 'John', 30) // 'John is 30 years old'
 */
function formatString(str, ...values) {
    let formatted = str;
    for (let value of values) {
        formatted = formatted.replace("{}", value);
    }
    return formatted;
}
/**
 * 문자열의 일부를 '*'로 대체
 * @param str 문자열
 * @param len '*'로 대체할 시작 길이
 * @returns 대체된 문자열
 * @example asteriskString('abcdef', 3) // 'abc***'
 */
function asteriskString(str, len) {
    if (str) {
        let replaceText = str.slice(len);
        return str.replace(replaceText, "*".repeat(replaceText.length));
    }
    return str;
}
/**
 * 문자열의 모든 특정 값을 새 값으로 교체
 * @param str 원본 문자열
 * @param oldValue 교체할 문자열
 * @param newValue 새로 교체할 문자열
 * @returns 교체된 문자열
 * @example replaceAll('hello hello', 'hello', 'hi') // 'hi hi'
 */
function replaceAll(str, oldValue, newValue) {
    return str.split(oldValue).join(newValue);
}
/**
 * 문자열을 특정 길이만큼 앞에서부터 채움
 * @param targetLength 채울 목표 길이
 * @param padString 채울 문자열
 * @param str 대상 문자열
 * @returns 앞이 채워진 문자열
 * @example padStart(5, '0', '12') // '0012'
 */
function padStart(targetLength, padString, str) {
    return str.length >= targetLength
        ? str
        : new Array(targetLength - str.length + 1).join(padString) + str;
}
/**
 * 문자열을 왼쪽 또는 오른쪽으로 채움
 * @param str 대상 문자열
 * @param len 채울 길이
 * @param ch 채울 문자
 * @param dir 'left' 또는 'right'
 * @returns 채워진 문자열
 * @example pad('123', 5, '0', 'left') // '00123'
 */
function pad(str, len, ch, dir) {
    let pad = "";
    if (len <= 0)
        return str;
    if (!ch && ch !== "0")
        ch = " ";
    ch = ch + "";
    if (ch === " " && len < 10) {
        pad = "          ".substring(0, len);
    }
    else {
        while (len > 0) {
            if (len & 1)
                pad += ch;
            len >>= 1;
            if (len)
                ch += ch;
        }
    }
    if (dir === "left") {
        return pad + str;
    }
    if (dir === "right") {
        return str + pad;
    }
    return 'Invalid direction. Use "left", "right"';
}
/**
 * 번호로 나열된 항목을 포맷
 * @param inputString 번호가 있는 항목 리스트 문자열
 * @returns 포맷된 문자열
 * @example formatItems('1. item1 2. item2') // '1. item1\n2. item2'
 */
function formatItems(inputString) {
    return inputString
        .split(/(?=\d+\.\s)/)
        .map((item) => item.trim())
        .join("\n");
}
/**
 * URL에서 특정 경로 추출
 * @param url URL 문자열
 * @param name 찾을 이름
 * @returns 추출된 경로
 * @example extractPathFromURL('http://example.com/image/file.PNG', 'image') // 'image/file.PNG'
 */
function extractPathFromURL(url, name) {
    const match = url.match(`${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/([\\w-]+)\\/([\\w]+)\\.(PNG|png)`);
    if (match) {
        return match[0];
    }
    else {
        return "";
    }
}
/**
 * 주어진 한글 문자열을 초성, 중성, 종성으로 분리하여 변환합니다.
 *
 * @param {string} keyword 변환할 한글 문자열
 * @returns {string} 초성, 중성, 종성으로 분리된 문자열
 * @example
 * spreadKorean("한글"); // "ㅎㅏㄴㄱㅡㄹ"
 * spreadKorean("가");   // "ㄱㅏ"
 */
function spreadKorean(keyword) {
    const initialSound = [
        0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 0x3141, 0x3142, 0x3143,
        0x3145, 0x3146, 0x3147, 0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d,
        0x314e,
    ];
    const middleSound = [
        0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154, 0x3155, 0x3156, 0x3157,
        0x3158, 0x3159, 0x315a, 0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160,
        0x3161, 0x3162, 0x3163,
    ];
    const lastSound = [
        0x0000, 0x3131, 0x3132, 0x3133, 0x3134, 0x3135, 0x3136, 0x3137, 0x3139,
        0x313a, 0x313b, 0x313c, 0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142,
        0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a, 0x314b, 0x314c, 0x314d,
        0x314e,
    ];
    const chars = [];
    const elements = [];
    for (let i = 0; i < keyword.length; i = i + 1) {
        chars[i] = keyword.charCodeAt(i);
        if (chars[i] >= 0xac00 && chars[i] <= 0xd7a3) {
            let initialPartial;
            let middlePartial;
            let lastPartial;
            const charOrder = chars[i] - 0xac00;
            initialPartial = charOrder / (21 * 28);
            const remainPartial = charOrder % (21 * 28);
            middlePartial = remainPartial / 28;
            lastPartial = remainPartial % 28;
            elements.push(String.fromCharCode(initialSound[Math.floor(initialPartial)]));
            switch (Math.floor(middlePartial)) {
                case 9:
                    elements.push("ㅗㅏ");
                    break;
                case 10:
                    elements.push("ㅗㅐ");
                    break;
                case 11:
                    elements.push("ㅗㅣ");
                    break;
                case 14:
                    elements.push("ㅜㅓ");
                    break;
                case 15:
                    elements.push("ㅜㅔ");
                    break;
                case 16:
                    elements.push("ㅜㅣ");
                    break;
                case 19:
                    elements.push("ㅡㅣ");
                    break;
                default:
                    elements.push(String.fromCharCode(middleSound[Math.floor(middlePartial)]));
            }
            if (lastPartial !== 0x0000) {
                switch (Math.floor(lastPartial)) {
                    case 3:
                        elements.push("ㄱㅅ");
                        break;
                    case 5:
                        elements.push("ㄴㅈ");
                        break;
                    case 6:
                        elements.push("ㄴㅎ");
                        break;
                    case 9:
                        elements.push("ㄹㄱ");
                        break;
                    case 10:
                        elements.push("ㄹㅁ");
                        break;
                    case 11:
                        elements.push("ㄹㅂ");
                        break;
                    case 12:
                        elements.push("ㄹㅅ");
                        break;
                    case 13:
                        elements.push("ㄹㅌ");
                        break;
                    case 14:
                        elements.push("ㄹㅍ");
                        break;
                    case 15:
                        elements.push("ㄹㅎ");
                        break;
                    case 18:
                        elements.push("ㅂㅅ");
                        break;
                    default:
                        elements.push(String.fromCharCode(lastSound[Math.floor(lastPartial)]));
                }
            }
        }
        else {
            elements.push(String.fromCharCode(chars[i]));
        }
    }
    return elements.join("");
}
