export interface LockerCell {
  id: string;
  image?: {
    src: string;
    alt: string;
    isTexture?: boolean;
  };
}

// Item photos are the 6 the client dropped into public/images/locker inside images/
// (image_940 = chest, 945 = empty texture, 946 = sneakers, 947 = books, 948 = box,
// 949 = LEGO set) — assigned across the 9 cells with 3 left empty and the LEGO box
// repeated once, per "keep them randomly, repeat some, keep 2-3 empty".
export const LOCKER_CELLS: LockerCell[] = [
  {
    id: 'a01',
    image: {
      src: '/images/locker-texture-empty.webp',
      alt: 'An empty locker interior',
      isTexture: true,
    },
  },
  {
    id: 'a02',
    image: {
      src: '/images/locker-item-chest.webp',
      alt: 'A small wooden chest inside the locker',
    },
  },
  {
    id: 'a03',
    image: {
      src: '/images/locker-item-lego.webp',
      alt: 'A boxed LEGO Technic Porsche set inside the locker',
    },
  },
  {
    id: 'b01',
    image: {
      src: '/images/locker-texture-empty.webp',
      alt: 'An empty locker interior',
      isTexture: true,
    },
  },
  {
    id: 'b02',
    image: {
      src: '/images/locker-item-books.webp',
      alt: 'A stack of three books inside the locker',
    },
  },
  {
    id: 'b03',
    image: {
      src: '/images/locker-item-sneakers.webp',
      alt: 'A pair of sneakers inside the locker',
    },
  },
  {
    id: 'c01',
    image: {
      src: '/images/locker-item-box.webp',
      alt: 'A taped cardboard box inside the locker',
    },
  },
  {
    id: 'c02',
    image: {
      src: '/images/locker-texture-empty.webp',
      alt: 'An empty locker interior',
      isTexture: true,
    },
  },
  {
    id: 'c03',
    image: {
      src: '/images/locker-item-lego.webp',
      alt: 'A boxed LEGO Technic Porsche set inside the locker',
    },
  },
];
