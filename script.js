const names = `
Oluwatooni,Selwyn,Jackilyn,Joshua,Simrat,Keren,Rohit,Amelia,Michalina,Adjei,Jessica,Jayden,Cezar,Harjot,Navjot,Robert,
Macauley,Charlie-Rae,Mason,Abbie,Gurneet,Taranveer,Dynisia,Rythm,Abraham,Jack,Richard,Nathan,Amelia,Leo,Daena,Jacob,
Reina,Cody,Savannah,Patryk,Prabhmeet,Arashpreet,Gagandeep,Gurleen,Gurneet,Ishmeet,Japneet,Navroj,Gurleen,Phoebe,Adam,
Olivia,Nissi,Prabhjot,Sukhmani Kaur,Katie,Amelia,Bethany,Jazmeen,Jumana,Zion,Mitchell,Muhmeen,Lashe,Eljun Keith,Emmie,
Roshan,Armando,Maneet,Charlie,Poppy,Roberts,Ella,Jasleen,Kartik,Sharon,Jacob,Ryan,Eshampreet,Gursahib,Manjot,Ratan,
Tripat Kaur,Ellie-May,Kaiden,Gavin,Malakai,Maddison,Peighton,George,Molly,Mackenzie,Cowyn,Zac,Mason,Alexis
`
  .split(",")
  .map((name) => name.trim());

const width = window.innerWidth;
const height = window.innerHeight;
const centerX = width / 2;
const centerY = height / 2;

const svg = d3.select("svg").attr("viewBox", `0 0 ${width} ${height}`);

const color = d3.scaleOrdinal(d3.schemeTableau10);

const textGroup = svg.append("g");

const maxRadius = Math.min(width, height) / 2.5;

// More items should be on outer radius
function skewedRadius() {
  return Math.pow(Math.random(), 0.6) * maxRadius;
}

const items = [];

// 🧑‍🎓 Add Student Names
names.forEach((name, i) => {
  const radius = skewedRadius();
  const angle = Math.random() * Math.PI * 2;
  const baseSize = 16 + Math.random() * 24;
  const rotationSpeed = 0.0008 + Math.random() * 0.0015;
  const pulseFreq = 0.5 + Math.random();
  const phase = Math.random() * Math.PI * 2;
  const cloudWobble = 10 + Math.random() * 20;
  const wobbleFreq = 0.5 + Math.random() * 1.5;

  const text = textGroup
    .append("text")
    .text(name)
    .attr("text-anchor", "middle")
    .attr("fill", color(i % 10))
    .style("font-family", "Impact");

  items.push({
    text,
    type: "text",
    baseSize,
    angle,
    radius,
    rotationSpeed,
    pulseFreq,
    phase,
    cloudWobble,
    wobbleFreq
  });
});

// 🔥 Add Phoenix Logo
const logoSize = 50;
const logo = textGroup
  .append("image")
  .attr("href", "phx.gif")
  .attr("width", logoSize)
  .attr("height", logoSize)
  .attr("x", -logoSize / 2)
  .attr("y", -logoSize / 2);

items.push({
  text: logo,
  type: "image",
  baseSize: logoSize,
  angle: Math.random() * Math.PI * 2,
  radius: maxRadius * 0.6,
  rotationSpeed: 0.0012,
  pulseFreq: 0.7,
  phase: Math.random() * Math.PI * 2,
  cloudWobble: 12,
  wobbleFreq: 0.8
});

// 🎥 Animation loop
function animate(t) {
  items.forEach((item) => {
    item.angle += item.rotationSpeed;

    const wobble =
      Math.sin((t / 1000) * item.wobbleFreq + item.phase) * item.cloudWobble;
    const effectiveRadius = item.radius + wobble;

    const x = centerX + Math.cos(item.angle) * effectiveRadius;
    const y = centerY + Math.sin(item.angle) * effectiveRadius;

    const scale = 0.9 + 0.3 * Math.sin((t / 800) * item.pulseFreq + item.phase);

    if (item.type === "text") {
      item.text
        .attr("font-size", item.baseSize * scale)
        .attr("transform", `translate(${x}, ${y})`);
    } else if (item.type === "image") {
      item.text
        .attr("width", item.baseSize * scale)
        .attr("height", item.baseSize * scale)
        .attr("x", x - (item.baseSize * scale) / 2)
        .attr("y", y - (item.baseSize * scale) / 2);
    }
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
