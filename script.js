const login = document.getElementById('login');
const text = document.getElementById('text');
const nama = document.getElementById('nama');
const body = document.querySelector('body');
const loginDisplay = document.querySelector('.login');
const gambar = document.getElementById('img');
const loading = document.querySelector('.loading');
const audio = document.querySelector('audio');
const tanya = document.querySelector(".tanyaMarah");
const meter = document.getElementById('meter')
const meterValue = document.getElementById('meterValue')
const meterDisplay = document.querySelector('.meter')
let kalimat = ``;
login.addEventListener('click', () => {
    body.classList.toggle('zoomBody')
    if (nama.value === "") {
        gambar.classList.toggle('imgAda1')
        kata(`nama ga boleh kosong dong`)
        nama.setAttribute('placeholder', 'nama jangan kosong');
        gambar.setAttribute('src', 'bear catat.gif');
    } else {
        audio.play()
        localStorage.setItem('halo', 'ada');
        let i = 0
        text.innerHTML = "";
        kalimat = `Gitu dong ${nama.value}`;
        loginDisplay.style.animation = "hilang 1s linear .5s forwards";
        ketik(text, kalimat, 50);
        gambar.setAttribute('src', 'bear nunggu.gif')
        const inv = setInterval(() => {
            if (i == 4) {
                loginDisplay.style.display = "none";
            }
            if (i == 5) {
                kata(`yudah bentar yahh ${nama.value} ...`);
                loading.style.display = "flex";
            }
            if (i == 20) {
                kata(`wait.. ntar lagi nih..`);
                body.classList.toggle('zoomBody')
            }
            if (i == 30) {
                loading.style.animation = "hilang 1s linear forwards";
                setTimeout(() => {
                    loading.style.display = "none";
                }, 1000)
                gambar.setAttribute('src', 'bear ketawa.gif');
                kata(`ahahaha nungguin ya 😂`);
                body.classList.toggle('zoomBody');
            }
            if (i == 35) {
                kata(`kasihan awokawok`)
                body.classList.toggle('zoomBody')
            }
            if (i == 40) {
                kata(`haha sorry sorry`)
                body.classList.toggle('zoomBody')
            }
            if (i == 45) {
                kata(`jangan marah`)
                body.classList.toggle('zoomBody')
            }
            if (i == 50) {
                kata(`emang kamu marah apa?`);
                gambar.setAttribute('src', 'bear tidur.gif')
                body.classList.toggle('zoomBody');
                tanya.style.display = "flex"
                clearInterval(inv)
            }
            i++;
            console.log(i)
        }, 500);
    }
});
let cihuy = {
    yesBtn: ["yudah maafin ya", "yeay aku dimaafin"],
    noBtn: ["kirain marah awokawok", "ga ngulang lagi deh", "maapin yak..."]
};

let step = 0;
let last = ""
function iya() {
    body.classList.toggle('zoomBody')
    if (last === "yes" || step === 0) {
        gambar.setAttribute("src", "bear1.gif");
        kata(cihuy.yesBtn[step])
        step = 1;
    } else if (last === "no") {
        lanjut()
        kata(cihuy.yesBtn[1]);
        gambar.setAttribute('src', 'bear joget1.gif');

    }
    last = "yes";
}
function tidak() {
    body.classList.toggle('zoomBody')
    if (last == "yes" || step > 0) {
        kata(cihuy.noBtn[step]);
        step = 2
    } else if (last !== "yes" || step > 0) {
        kata(cihuy.noBtn[step]);
        if (step >= 2) {
            step = 0
        }
        step++;
        lanjut();
        gambar.setAttribute('src', 'bear ketawa.gif');
    }
    last = "no"
}
function lanjut() {
    let i = 0
    tanya.style.animation = "hilang 1s linear forwards";
    let inv = setInterval(() => {
        if (i == 4) {
            tanya.style.display = "none";
        }
        if (i == 8) {
            gambar.setAttribute('src', 'bear tanya.gif');
            kata("aku mau tanya");
        }
        if (i == 10) {
            kata("seberapa sayang kamu dengan ku?");
            meterDisplay.style.display = "flex";
            meterDisplay.style.animation = "ada 1s linear forwards"
        }
        if (i == 12) {
            clearInterval(inv)
        }
        i++;
    }, 500)
}

const ketik = (element, value, speed = 50) => {
    let index = 0;
    let inv = setInterval(() => {
        element.innerHTML += value.charAt(index);
        if (index > value.length) {
            clearInterval(inv);
        }
        index++;
        console.log(index);
    }, speed);
}
const kata = (kalimat, speed = 50) => {
    text.innerHTML = "";
    let kataKata = kalimat;
    ketik(text, kataKata, speed)
};
meter.addEventListener('input', () => {
    meterValue.innerHTML = `${meter.value}%`
});

function next() {
    body.classList.toggle('zoomBody')
    let p = ``
    if (meter.value < 50) {
        p = `anjir sayangnya cuma ${meter.value}% dibawah 50%`;
        gambar.setAttribute('src', 'bear1.gif');
    } else if (meter.value == 50) {
        p = `cuma ${meter.value}% yah, yudah deh gapapa`;
    } else if (meter.value > 50 && meter.value < 100) {
        gambar.setAttribute('src', 'bear joget1.gif');
        p = `wiss ${meter.value}% walau ga 100%`
    } else if (meter.value == 100) {
        p = `wissss 100%, aku juga sayang kamu kok`;
        gambar.setAttribute('src', 'bear joget1.gif');
    }
    i = 0;
    kata(p);
    inv = setInterval(() => {
        if (i == 2) {
            meterDisplay.style.animation = "hilang .5s linear forwards";
            body.classList.toggle('zoomBody');
        }
        else if (i == 3) {
            meterDisplay.style.display = "none";
            if (meter.value < 50) {
                kata(`yudah deh gapapa walau cuma ${meter.value}%`);
            } else if (meter.value > 50 && meter.value < 100) {
                kata(`makasi ya, walau cuma ${meter.value}%`);
            } else if (meter.value == 50) {
                kata(`gapapa deh walau cuma setengah persen`);
            } else if (meter.value == 100) {
                kata(`yee makasi yahh udah sayang banget`);
            }
        } else if (i == 5) {
            kata(`aku punya sesuatu ni buat kamu ${nama.value}`)
        } else if (i == 6) {
            hadiah.style.display = "flex"
            clearInterval(inv)
        }
        i++;
    }, 1000)
}
document.getElementById('loveBtn').addEventListener('click', function () {
    // Memunculkan banyak love secara random
    for (let i = 0; i < 30; i++) { // Atur jumlah love yang ingin ditampilkan (misalnya 30)
        setTimeout(createLove, i * 100); // Menambahkan sedikit jeda antara love agar terlihat lebih menarik
    }
    tutup.style.opacity = ".5"
    tutup.style.transform = "translateY(-7rem) rotate(-45deg) translateX(-50px)";
    tempat.style.transform = "translate(0,3.5rem)"
    let idx = 0
    let inv = setInterval(() => {
        if (idx == 1) {
            tutup.style.opacity = "0"
            tempat.style.opacity = "0"
            bunga.style.width = "10rem"
            kata("ini buat kamu")

            gambar.setAttribute('src', 'bear bunga.gif')
        }
        if (idx == 3) {
            tutup.style.display = "none"
            tempat.style.display = "none"
            terima.style.opacity = "1";
            terima.style.display = "flex";

        }
        if (idx == 4) {
            clearInterval(inv)
        }
        idx++;
    }, 500)
});
function createLove() {
    // Membuat elemen span untuk menampilkan love
    let love = document.createElement('span');
    love.classList.add('heart');
    love.innerHTML = '❤️';

    // Mengatur posisi love secara random di halaman
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    love.style.left = x + 'px';
    love.style.top = y + 'px';

    // Menambahkan love ke dalam body
    document.body.appendChild(love);

    // Menghapus love setelah animasi selesai
    setTimeout(function () {
        love.remove();
    }, 4000);
}
const tutup = document.getElementById('tutup')
const tempat = document.getElementById('tempat')
const bunga = document.getElementById('bunga')
const terima = document.getElementById('terima')
const hadiah = document.querySelector('.hadiah')
const tab = document.querySelector('.yeay')
let idx = 0
let nn;
function ambil(e) {
    switch (e) {
        case 'y':
            nextBody(ter)
            nn = "makasih yah bunga nya"
            gambar.setAttribute('src', 'joget.gif');
            break;
        case 't':
            nn = "sorry yah aku ga nerima bunga kamu"
            nextBody(tol)
            gambar.setAttribute('src', 'nangis.gif');
            break;
        default:
            console.log('error');
    }
    setTimeout(() => {
        terima.style.display = "none";
        setTimeout(() => {
            bunga.style.opacity = "0"
            tab.style.display = "block"

        }, 1000)

    }, 700);
    idx = 1
};
idx = 0
let ter = ['yeay bunga aku diterima', 'makasih yah kamu udah terima', 'senang banget tau', 'ada yang mau ku bilang ni', 'kamu semangat yah', 'iya,tetep semangat dalam melakukan hal apapun', 'dan juga jangan telat makan ntar sakit', 'yudah deh cuma itu aja sih', 'makasi yah udah main'];
let tol = ['bjir ditolak bunga nya', 'yudah deh gapapa', 'walau agak sedih sih', 'yudh deh, aku cuma mau bilang', 'kamu semangat yah', 'iya,tetep semangat dalam melakukan hal apapun', 'dan juga jangan telat makan ntar sakit', 'yudah deh cuma itu aja sih', 'makasi yah udah main'];

function nextBody(element) {
    let idx = 0;
    document.body.addEventListener('click', () => {
        kata(element[idx]);
        if (idx == element.length) {
            hadiah.style.display = "none"
            document.querySelector('.info').style.display = "none";
            document.querySelector('.kamuSyang').style.display = "flex";
            tab.style.display = "none"
        }
        idx++;
    });
}
const u = document.querySelector('.cihuy')
const tanyaSyg = document.getElementById('tanyaSyg')
function yo(e) {
    tanyaSyg.innerHTML = ""
    if (e == 1) {
        let o = `aku juga sayang kamu ${nama.value}`
        ketik(tanyaSyg, o)
        i = 0;
        inv = setInterval(() => {
            if (i == 2) {
                u.style.display = "none"
            }
            if (i == 4) {
                let ii = `kirim ke wa ya jawabanya`;
                tanyaSyg.innerHTML = ""
                ketik(tanyaSyg, ii)
            }
            if (i == 6) {
                kirimWa()
            }
            if (i == 8) {
                clearInterval(inv);
            }
            i++;
        }, 500)
    }
    else if (e == 0) {
        let o = `yahh yudah deh gapapa`
        ketik(tanyaSyg, o)
        i = 0;
        inv = setInterval(() => {
            if (i == 2) {
                u.style.display = "none"
            }
            if (i == 4) {
                let ii = `kirim ke wa ya jawabanya`;
                tanyaSyg.innerHTML = ""
                ketik(tanyaSyg, ii)
            }
            if (i == 6) {
                kirimWa()
            }
            if (i == 8) {
                clearInterval(inv);
                audio.paused()
            }
            i++;
        }, 500)
    }
}
function kirimWa() {
    let noHp = `+6282352373674`
    let pesan = `sayang aku ke kamu ${meter.value}%, ${nn}`
    var url = `https://wa.me/${noHp}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
}
const codeDisplay = document.querySelector('.code')
if (localStorage.getItem('halo')) {
    loginDisplay.style.display = "none";
    document.querySelector('.info').style.display = "none"
    document.querySelector('.yi').style.display = "flex"
    audio.paused();
}