import { TokenType } from "./token_type";

class Token {
    public constructor(
        public readonly type: TokenType,
        public readonly data: unknown | undefined,
        public readonly line: number,
        public readonly column: number,
    ) {}
}

export default Token;
