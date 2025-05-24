import re

def process_dollar_signs(text):
    result = []
    i = 0
    in_math = False

    while i < len(text):
        if text[i:i+2] == '$$':
            # Leave $$ as is
            result.append('$$')
            i += 2
        elif text[i] == '$':
            if in_math:
                result.append(' \\\)')
            else:
                result.append('\\\( ')
            in_math = not in_math
            i += 1
        else:
            result.append(text[i])
            i += 1

    return ''.join(result)

def process_markdown_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    processed_content = process_dollar_signs(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(processed_content)

# 示例使用
if __name__ == '__main__':
    input_md = '2025-02-09-blog-post-1.md'
    output_md = '2025-02-09-blog-post-2.md'
    process_markdown_file(input_md, output_md)
