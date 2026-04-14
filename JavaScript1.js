const gameUrls = [
    "Html/StoreOfSteam.html",
    "Html/PlantsVRBaloons.html",
    "Html/UltrakillRemake.html",
    "Html/Gravity.html",
    "Html/GlacialRailways.html",
    "Html/GlacialRailways.html",
    "Html/GlacialRailways.html",
    "Html/GlacialRailways.html",
    "Html/GlacialRailways.html"
];

function goToRandomGame() {
    const randomIndex = Math.floor(Math.random() * gameUrls.length);
    window.location.href = gameUrls[randomIndex];
}