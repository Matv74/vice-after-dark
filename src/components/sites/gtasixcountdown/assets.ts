export const assetRoot = "/sites/gtasixcountdown";

export const backgrounds = [
  ["GTA VI Artwork", "gta-vi-artwork-bg.webp"],
  ["GTA VI Trailer 2 Art", "gta-vi-trailer2-art.webp"],
  ["GTA VI Cover Art", "Official_Cover_Art_landscape.webp"],
  ["Ultimate Edition", "ULTIMATE_EDITION_01.16qc1xq5nigg1.webp"],
  ["Ultimate Edition 02", "ULTIMATE_EDITION_02.0q-6.nrtf~jj0.webp"],
  ["Ultimate Edition Safe House", "ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_03.0c9.qtpdi.tf.webp"],
  ["Ultimate Edition Good Time Gear", "ULTIMATE_EDITION_GOODTIME_GEAR_01.0t7de8dow381q.webp"],
  ["Boobie_Ike_01", "Boobie_Ike_01.webp"],
  ["Cal_Hampton_03", "Cal_Hampton_03.webp"],
  ["Leonida_Keys_01", "Leonida_Keys_01.webp"],
  ["Real_Dimez_02", "Real_Dimez_02.webp"],
  ["Vice City Sign", "gta-vi-vicecity-sign.webp"],
  ["Vice City Beach", "vice-city-beach.webp"],
  ["Vice_City_17", "Vice_City_17.0er79m2u3nygs.jpg"],
  ["Lucia_Caminos_11", "Lucia_Caminos_11.0j617-ylicowx.jpg"],
  ["Jason and Lucia", "Jason_and_Lucia_16.05-d133mx68ku.jpg.avif"],
  ["Grassrivers_07", "Grassrivers_07.0txitddjiq5o1.jpg.avif"],
  ["Grassrivers_08", "Grassrivers_08.0x-z0h-he35zo.jpg.avif"],
  ["GTA VI Trailer Video", "gta-vi-bg-trailer.mp4"],
  ["GTA VI Trailer 2 Video", "gta-vi-bg-trailer-2.mp4"],
] as const;

export const coverArt = backgrounds[2][1];
export const backgroundFiles = backgrounds.map(([, file]) => file);
export const stillBackgrounds = backgroundFiles.filter((file) => !file.endsWith(".mp4"));

export const widgetBackgrounds = [
  ["Default Cover", "default"],
  ["Transparent", "transparent"],
  ["Solid Dark", "solid"],
  backgrounds[0],
  backgrounds[1],
  backgrounds[12],
] as const;
