export const TokenTypes = [
    "RIGHT_PARAN", // '('
    "LEFT_PARAN", // ')'
    "RIGHT_BRACE", // '{'
    "LEFT_BRACE", // '}'
    "LEFT_BRACKET", // '['
    "RIGHT_BRACKET", // ']'
    "COMMA", // ','
    "DOT", // '.'
    "SEMICOLON", // ';'

    // 1-2 char tokens
    "MINUS", // '-'
    "MINUS_EQUAL", // '-='
    "PLUS", // '+'
    "PLUS_EQUAL", // '+='
    "SLASH", // '/'
    "SLASH_EQUAL", // '/='
    "STAR", // '*'
    "STAR_EQUAL", // '*='
    "EQUAL", // '='
    "EQUAL_EQUAL", // '=='
    "BANG", // '!'
    "BANG_EQUAL", // '!='
    "GREATER", // '>'
    "GREATER_EQUAL", // '>='
    "LESS", // '<'
    "LESS_EQUAL", // '<='
    "AND", // '&'
    "AND_AND", // '&&'
    "OR", // '|'
    "OR_OR", // '||'

    // literals
    "IDENTIFIER",
    "STRING",
    "NUMBER",

    // keywords
    "IF", // 'if'
    "ELSE", // 'else'
    "MATCH", // 'match'
    "FUNC", // 'func'
    "FOR", // 'for'
    "RETURN", // 'return'
    "TRUE", // 'true'
    "FALSE", // 'false'
    "VAR", // 'var'
    "CONST", // 'const'
    "WHILE", // 'while'

    "EOF",
] as const;

export type TokenType = (typeof TokenTypes)[number];

export const keywordsMap = {
    if: "IF",
    else: "ELSE",
    match: "MATCH",
    func: "FUNC",
    for: "FOR",
    return: "RETURN",
    true: "TRUE",
    false: "FALSE",
    var: "VAR",
    const: "CONST",
    while: "WHILE",
} as Record<string, TokenType>;
