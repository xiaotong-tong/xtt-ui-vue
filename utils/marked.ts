import type { MarkedOptions } from "marked";
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import plaintext from "highlight.js/lib/languages/plaintext";
import diff from "highlight.js/lib/languages/diff";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("plaintext", plaintext as any);
hljs.registerLanguage("diff", diff);

marked.setOptions({
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	mangle: false
} as MarkedOptions);

marked.use(
	markedHighlight({
		langPrefix: "hljs language-",
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			const resCode = hljs.highlight(code, { language });
			// 添加代码块前的行号
			return resCode.value
				.replace(/\\?&(amp|lt|gt|nbsp);/g, (match) => {
					if (match.startsWith("\\")) {
						return match.slice(1);
					}

					// 下面一些字符在 xss 过滤时会被转义，但是这里因为是代码块，不会显示这些 HTML 实体，所以需要手动转义回来
					return (
						{
							"&lt;": "<",
							"&gt;": ">",
							"&nbsp;": " ",
							"&amp;": "&"
						}[match] || match
					);
				})
				.split("\n")
				.map((line, index) => {
					return `<span class="code-line" data-line-num="${index + 1}">${line}</span>`;
				})
				.join("\n");
		}
	}),

	gfmHeadingId({
		prefix: "nami-md-"
	})
);

export { marked };
