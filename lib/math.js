import renderMathInElement from 'katex/contrib/auto-render';

export function renderMath() {
  renderMathInElement(document.body, {
    delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\begin{align*}", right: "\\end{align*}", display: true}
    ]
});
}