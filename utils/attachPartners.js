let partnersIdArray = [1, 100, 105, 107, 109, 11, 110, 113, 114, 117, 118, 119, 120, 121, 122, 125, 126, 127, 128, 130, 131, 132, 134, 136, 137, 139, 14, 143, 144, 145, 146, 147, 148, 157, 163, 164, 165, 166, 167, 169, 170, 173, 179, 181, 182, 183, 185, 188, 189, 190, 191, 193, 197, 198, 200, 201, 205, 206, 209, 210, 211, 212, 213, 215, 217, 221, 222, 225, 226, 227, 228, 23, 230, 231, 233, 234, 235, 236, 237, 238, 240, 243, 245, 247, 248, 249, 250, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 264, 265, 266, 267, 268, 269, 271, 272, 273, 277, 279, 280, 281, 282, 283, 284, 285, 286, 29, 290, 291, 294, 295, 297, 299, 300, 301, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 313, 314, 316, 317, 318, 319, 321, 322, 323, 324, 325, 326, 327, 328, 329, 331, 332, 333, 334, 335, 336, 337, 340, 341, 342, 343, 344, 346, 350, 355, 357, 358, 359, 360, 362, 369, 384, 385, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 40, 400, 401, 402, 403, 404, 407, 409, 41, 410, 412, 413, 414, 415, 416, 418, 419, 421, 422, 424, 425, 427, 428, 429, 43, 430, 433, 434, 435, 436, 439, 441, 444, 446, 449, 45, 451, 452, 455, 456, 457, 458, 46, 461, 464, 53, 54, 62, 63, 64, 65, 69, 71, 72, 76, 77, 79, 80, 81, 83, 89, 9, 90, 94, 95, 97, 98, 99];

// let partnersIdArray = [1, 100, 105, 107, 109, 11, 113, 114, 117, 118, 121, 122, 125, 126, 127, 128, 131, 132, 134, 137, 139, 14, 143, 145, 146, 147, 148, 157, 163, 164, 165, 166, 167, 169, 170, 181, 182, 183, 185, 188, 189, 190, 191, 193, 197, 198, 200, 201, 205, 206, 209, 210, 211, 212, 213, 215, 217, 221, 222, 225, 226, 227, 228, 230, 231, 233, 234, 235, 236, 237, 238, 240, 243, 245, 247, 248, 249, 250, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 264, 265, 266, 267, 268, 269, 271, 272, 273, 277, 279, 280, 281, 282, 283, 284, 285, 286, 29, 290, 291, 294, 295, 297, 299, 300, 301, 302, 303, 304, 305, 308, 309, 311, 312, 313, 314, 316, 317, 318, 319, 321, 323, 324, 326, 334, 336, 337, 340, 341, 342, 344, 346, 350, 384, 385, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 40, 400, 401, 402, 403, 404, 407, 409, 41, 410, 412, 413, 414, 415, 416, 418, 419, 422, 424, 425, 427, 428, 434, 435, 436, 439, 441, 444, 446, 45, 451, 452, 455, 456, 457, 458, 46, 461, 464, 53, 54, 62, 63, 64, 65, 69, 72, 77, 79, 80, 81, 9, 90, 94, 95, 98, 99];

let partnerIndex = -1;

function attachPartnerStyle(id) {
    let partnerStyle = document.getElementById('partnerStyleCssLink');
    let date = Date.now();
    let href = `/Partners/${id}/Styles/web.css?${date}`;
    partnerStyle.setAttribute('href', href);
}


function make() {
    partnerIndex++;
    attachPartnerStyle(partnersIdArray[partnerIndex]);
    console.log(`partner style ${partnersIdArray[partnerIndex]} attached`);
}

window.addEventListener('keypress', (e) => {
    if (e.code === "NumpadEnter") {
        make();
    }
})