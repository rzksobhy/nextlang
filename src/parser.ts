import Token from "./token";
import { TokenType, keywordsMap } from "./token_type";

const isDigit = (input: string) => {
    return input >= "0" && input <= "9";
};

const isAlpha = (input: string) => {
    return (
        (input >= "a" && input <= "z") ||
        (input >= "A" && input <= "Z") ||
        input == "_"
    );
};

const isAlphaNumberic = (input: string) => isAlpha(input) || isDigit(input);

function* parseInput(input: string) {
    let line = 1;
    let column = 1;

    const createToken = (
        token: TokenType,
        data?: unknown,
        _line: number = line,
        _column: number = column,
    ) => new Token(token, data, _line, _column);

    let current = 0;
    const isAtEnd = (idx?: number) => (idx ?? current) >= input.length;
    const getToken = (idx?: number) => {
        idx ??= current;
        if (isAtEnd(idx)) {
            return "\0";
        }

        return input[idx];
    };

    const advance = (step: number = 1) => {
        current += step;
        column += step;
    };

    const parseString = (terminator: '"' | "'") => {
        const startIndex = current;

        while (getToken() != terminator && !isAtEnd()) {
            advance();
        }

        const endIndex = current;

        return input.substring(startIndex, endIndex);
    };

    const parseNumber = () => {
        const startIndex = current;

        while (isDigit(getToken())) advance();

        if (getToken() == "." && isDigit(getToken(current + 1))) {
            // consume the "."
            advance();

            while (isDigit(getToken())) advance();
        }

        const endIndex = current;

        return +input.substring(startIndex, endIndex);
    };

    const parseIdentifier = () => {
        const startIndex = current;
        while (isAlphaNumberic(getToken())) advance();
        const endIndex = current;

        return input.substring(startIndex, endIndex);
    };

    while (!isAtEnd()) {
        const token = getToken();

        if (token == "(") {
            yield createToken("LEFT_PARAN");
            advance();
        } else if (token == ")") {
            yield createToken("RIGHT_PARAN");
            advance();
        } else if (token == "{") {
            yield createToken("LEFT_BRACE");
            advance();
        } else if (token == "}") {
            yield createToken("RIGHT_BRACE");
            advance();
        } else if (token == "[") {
            yield createToken("LEFT_BRACKET");
            advance();
        } else if (token == "]") {
            yield createToken("RIGHT_BRACKET");
            advance();
        } else if (token == ",") {
            yield createToken("COMMA");
            advance();
        } else if (token == ".") {
            yield createToken("DOT");
            advance();
        } else if (token == ";") {
            yield createToken("SEMICOLON");
            advance();
        } else if (token == "-") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("MINUS_EQUAL");
                advance(2);
            } else {
                yield createToken("MINUS");
                advance();
            }
        } else if (token == "+") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("PLUS_EQUAL");
                advance(2);
            } else {
                yield createToken("PLUS");
                advance();
            }
        } else if (token == "/") {
            const nextToken = getToken(current + 1);

            if (nextToken == "/") {
                while (getToken() != "\n" && !isAtEnd()) {
                    advance();
                }
            } else if (nextToken == "=") {
                yield createToken("SLASH_EQUAL");
                advance(2);
            } else {
                yield createToken("SLASH");
                advance();
            }
        } else if (token == "*") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("STAR_EQUAL");
                advance(2);
            } else {
                yield createToken("STAR");
                advance();
            }
        } else if (token == "=") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("EQUAL_EQUAL");
                advance(2);
            } else {
                yield createToken("EQUAL");
                advance();
            }
        } else if (token == "!") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("BANG_EQUAL");
                advance(2);
            } else {
                yield createToken("BANG");
                advance();
            }
        } else if (token == ">") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("GREATER_EQUAL");
                advance(2);
            } else {
                yield createToken("GREATER");
                advance();
            }
        } else if (token == "<") {
            const nextToken = getToken(current + 1);

            if (nextToken == "=") {
                yield createToken("LESS_EQUAL");
                advance(2);
            } else {
                yield createToken("LESS");
                advance();
            }
        } else if (token == "&") {
            const nextToken = getToken(current + 1);

            if (nextToken == "&") {
                yield createToken("AND_AND");
                advance(2);
            } else {
                yield createToken("AND");
                advance();
            }
        } else if (token == "|") {
            const nextToken = getToken(current + 1);

            if (nextToken == "|") {
                yield createToken("OR_OR");
                advance(2);
            } else {
                yield createToken("OR");
                advance();
            }
        } else if (token == " " || token == "\r" || token == "\t") {
            advance();
        } else if (token == "\0") {
            break;
        } else if (token == "\n") {
            column = 1;
            line += 1;
            current += 1;
        } else if (token == '"' || token == "'") {
            const startLine = line;
            const startColumn = column;

            // skip first terminator
            advance();

            const result = parseString(token);
            yield createToken("STRING", result, startLine, startColumn);

            // skip end terminator
            advance();
            // } else if (true /* isAlpha */) {
            //     throw new Error("not implemented");
        } else if (isDigit(token)) {
            const startLine = line;
            const startColumn = column;

            const result = parseNumber();
            yield createToken("NUMBER", result, startLine, startColumn);
        } else if (isAlpha(token)) {
            const result = parseIdentifier();

            const keyword = keywordsMap[result];
            if (keyword) {
                yield createToken(keyword);
            } else {
                yield createToken("IDENTIFIER", result);
            }
        }
    }
}

export default parseInput;
