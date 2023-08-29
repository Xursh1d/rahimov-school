export const pointToMark = (point) => {
    if (point < 56) {
        return "2";
    } else if (point >= 86) {
        return "5";
    } else if (71 < point && point < 86) {
        return "4";
    } else if (55 < point && point < 72) {
        return "3";
    } else {
        return null;
    }
}
