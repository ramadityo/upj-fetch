const originalUrl = "https://www.upj.ac.id/news/tag/672/highlight";
const proxyUrl = `https://cors-anywhere.herokuapp.com/${originalUrl}`;

const iframe = document.getElementById("myIframe");

function proxyfyUrl(url) {
    if (url.startsWith("http")) {
        return `https://cors-anywhere.herokuapp.com/${url}`;
    }
    return url;
}

fetch(proxyUrl, {
    headers: {
        Origin: "https://www.upj.ac.id/news/tag/672/highlight",
        "X-Requested-With": "XMLHttpRequest",
    },
})
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        // doc.querySelectorAll("a[href]").forEach((a) => {
        //     a.href = proxyfyUrl(a.href);
        // });
        const style = doc.createElement("style");
        style.textContent = "#header { display: none !important; } #page-title{ display: none !important; } #footer { display: none !important; } #scrollTop {display: none !important;} .right-icon-terbang {display: none !important;}";

        doc.head.appendChild(style);
        iframe.srcdoc = doc.documentElement.outerHTML;
    })
    .catch((error) => console.error("Error:", error));

setTimeout(() => {
    console.clear();
}, 4000);
