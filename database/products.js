const DUMMY_PRODUCTS = [
  {
    name: 'Procaliber 9.7 [2024]',
    imgSrc: 'database\\images\\productImgs\\Procaliber97_24_WHT_Primary-571x379.jpg',
    price: '105.000.000 VND',
    dataColors: ['#ffffff', '#000000'],
    ID: 'a07c4d6ca1',
    type: 'mountain'
  },
  {
    name: 'Fuel EX 5 Gen 6 [2023]',
    imgSrc: 'database\\images\\productImgs\\FueL_EX5-2023_gen6_Hero-571x379.jpg',
    price: '65.000.000 VND',
    dataColors: ['#303030', '#000000'],
    ID: '36b9b496cb',
    type: 'mountain'
  },
  {
    name: 'Domane AL 4 Gen 3  Copy',
    imgSrc: 'database\\images\\productImgs\\Domane_AL4_Disc_23_BLK-571x379.jpg',
    price: '70.000.000 VND',
    dataColors: ['#000000', '#4c4c4c'],
    ID: 'e9e7f2281e',
    type: 'road'
  },
  {
    name: 'Domane AL 4 Gen 3',
    imgSrc: 'database\\images\\productImgs\\Domane_AL4_Disc_23_BLK-571x379.jpg',
    price: '39.900.000 VND',
    dataColors: ['#383838', '#000000'],
    ID: '1daa4c0e22',
    type: 'road'
  },
  {
    name: 'Checkpoint ALR 4',
    imgSrc: 'database\\images\\productImgs\\CheckpointALR5_24_GRN_Hero-571x379.jpg',
    price: '49.900.000 VND',
    dataColors: ['#81d742', '#000000'],
    ID: 'd746baad05',
    type: 'road'
  },
  {
    name: 'Domane SL 6 [2023] Gen 4',
    imgSrc: 'database\\images\\productImgs\\Domane-SL-6-23-BLK_Hero-571x379.jpg',
    price: '110.000.000 VND',
    dataColors: ['#000000', '#474747'],
    ID: '8872825731',
    type: 'road'
  },
  {
    name: 'Émonda ALR 5',
    imgSrc: 'database\\images\\productImgs\\EmondaALR-_5_Hero-571x379.jpg',
    price: '55.000.000 VND',
    dataColors: ['#95c1d9', '#eb867d'],
    ID: '1e01d89b15',
    type: 'road'
  },
  {
    name: 'Supercaliber SLR 9.9 X0 AXS Gen 2',
    imgSrc: 'database\\images\\productImgs\\SupercaliberSLR_99_X0-AXS_RED_Primary-571x379.jpg',
    price: '215.000.000 VND',
    dataColors: ['#681d18', '#000000'],
    ID: 'b18ee60d4c',
    type: 'mountain'
  },
  {
    name: 'Supercaliber SL 9.6 Gen 2',
    imgSrc: 'database\\images\\productImgs\\Supercaliber96_23_BLU_Primary-571x379.jpg',
    price: '110.000.000 VND',
    dataColors: ['#1e73be', '#000000'],
    ID: '549bcc1d29',
    type: 'mountain'
  },
  {
    name: 'Roscoe 6',
    imgSrc: 'database\\images\\productImgs\\Roscoe6_Hero-571x379.jpg',
    price: '23.900.000 VND',
    dataColors: ['#000000', '#dd3333'],
    ID: 'a2107f83a6',
    type: 'mountain'
  },
  {
    name: 'Émonda SL 6 AXS',
    imgSrc: 'database\\images\\productImgs\\EmondaSL6AXS_23Primary.-571x379.jpg',
    price: '129.000.000 VND',
    dataColors: ['#021521', '#4f4f4f'],
    ID: '9e923872bd',
    type: 'road'
  },
  {
    name: 'Verve 2 Disc [2023]',
    imgSrc: 'database\\images\\productImgs\\Verve2_23_BLU_Hero-571x379.jpg',
    price: '16.900.000 VND',
    dataColors: ['#1e73be', '#b2b2b2'],
    ID: '498d916eed'
  },
  {
    name: 'FX 2 Disc  Stagger',
    imgSrc: 'database\\images\\productImgs\\FX2DiscStagger_22_35004_B_Primary-571x379.jpg',
    price: '16.500.000 VND',
    dataColors: ['#ed2700', '#000000'],
    ID: '9723b32e60',
    type: 'touring'
  },
  {
    name: 'Roscoe 24 [2023]',
    imgSrc: 'database\\images\\productImgs\\Roscoe24-571x379.jpg',
    price: '18.000.000 VND',
    dataColors: ['#000000', '#00d69d'],
    ID: '9d39c6d88d',
    type: 'kids'
  },
  {
    name: 'Roscoe 20 [2023]',
    imgSrc: 'database\\images\\productImgs\\Roscoe20_Hero-571x379.jpg',
    price: '19.000.000 VND',
    dataColors: ['#000000', '#00d69d'],
    ID: '26ce917edc',
    type: 'kids'
  },
  {
    name: 'Precaliber 24 8SP Boy’s [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber248speed_23_36965_A_Primary-571x379.jpg',
    price: '8.500.000 VND',
    dataColors: ['#757575', '#dd9933'],
    ID: 'd9664461f6',
    type: 'kids'
  },
  {
    name: 'Checkpoint ALR 5',
    imgSrc: 'database\\images\\productImgs\\CheckpointALR5_22_35172_B_Primary-571x379.jpg',
    price: '65.000.000 VND',
    dataColors: ['#0b1b49', '#b7382a'],
    ID: '48172bd21a',
    type: 'road'
  },
  {
    name: 'Domane SL 7 eTap [2023] Gen 4',
    imgSrc: 'database\\images\\productImgs\\Domane-SL-6-eTap-23-Hero-571x379.jpg',
    price: '179.000.000 VND',
    dataColors: ['#ffffff', '#6b1e16'],
    ID: 'ad5cd0b062',
    type: 'road'
  },
  {
    name: 'Verve 1 Disc [2023]',
    imgSrc: 'database\\images\\productImgs\\Verve1_23_36811_A_Primary-571x379.jpg',
    price: '13.500.000 VND',
    dataColors: ['#000000', '#967801'],
    ID: 'd6fa221733'
  },
  {
    name: 'Verve 2 Disc Lowstep [2023]',
    imgSrc: 'database\\images\\productImgs\\Verve2DiscLowStep_23_GRN_Hero-571x379.jpg',
    price: '16.900.000 VND',
    dataColors: ['#40ceb2', '#003b42'],
    ID: '98c93cb961'
  },
  {
    name: 'Verve 1 Disc Lowstep [2023]',
    imgSrc: 'database\\images\\productImgs\\Verve1DiscLowStep_23_Red_Hero-571x379.jpg',
    price: '13.500.000 VND',
    dataColors: ['#dd3333', '#353535'],
    ID: '57a59cf160'
  },

  {
    name: 'Precaliber 16 [2023]',
    imgSrc: 'database\\images\\productImgs\\PreCaliber16_2023_GRN-571x379.jpg',
    price: '6.500.000 VND',
    dataColors: ['#d5f44b', '#004863'],
    ID: 'b914f3211e',
    type: 'kids'
  },
  {
    name: 'Domane AL 3 Disc 2023',
    imgSrc: 'database\\images\\productImgs\\Domane_AL3_Disc_23.-571x379.jpg',
    price: '29.900.000 VND',
    dataColors: ['#606060', '#bf2b2b'],
    ID: 'bea289c25b',
    type: 'road'
  },
  {
    name: 'Dual Sport 3 [2023] Gen 5',
    imgSrc: 'database\\images\\productImgs\\DS3_2023_GRN-571x379.jpg',
    price: '20.900.000 VND',
    dataColors: ['#173a01', '#84561a'],
    ID: '5c44d7547d',
    type: 'touring'
  },
  {
    name: 'Dual Sport 2 [2023] Gen 5',
    imgSrc: 'database\\images\\productImgs\\DS2_2023_BLU-571x379.jpg',
    price: '17.900.000 VND',
    dataColors: ['#4f4f4f', '#000000'],
    ID: '38ac40f599',
    type: 'touring'
  },
  {
    name: 'Dual Sport 1 [2023] Gen 5',
    imgSrc: 'database\\images\\productImgs\\DS1_2023_GRY-571x379.jpg',
    price: '14.900.000 VND',
    dataColors: ['#4f4f4f', '#000000'],
    ID: '6802f4ad5c',
    type: 'touring'
  },
  {
    name: 'Domane SL 5 [2023] Gen 4',
    imgSrc: 'database\\images\\productImgs\\Domane_SL5_23_Gen-571x379.jpg',
    price: '89.000.000 VND',
    dataColors: ['#161616', '#dd3333'],
    ID: '72ba4737eb',
    type: 'road'
  },
  {
    name: 'Top Fuel 8',
    imgSrc: 'database\\images\\productImgs\\TOP-FUEL-8_Hero-571x379.jpg',
    price: '85.000.000 VND',
    dataColors: ['#00285e', '#00285e'],
    ID: '24ac8a2a05',
    type: 'mountain'
  },
  {
    name: 'Procaliber 9.8 [2022]',
    imgSrc: 'database\\images\\productImgs\\Procaliber98_22_Hero-571x379.jpg',
    price: '130.000.000 VND',
    dataColors: ['#6b0707', '#dd3333'],
    ID: '30d8b9b16e',
    type: 'mountain'
  },
  {
    name: 'Domane SL 6 eTap [2023] Gen 4',
    imgSrc: 'database\\images\\productImgs\\Domane-SL-6-eTap-23-Hero-571x379.jpg',
    price: '125.000.000 VND',
    dataColors: ['#9b231f', '#ffffff'],
    ID: '2999f7993b',
    type: 'road'
  },
  {
    name: 'Madone SL 7 eTap [2023]',
    imgSrc: 'database\\images\\productImgs\\Madone-SL-7-eTap_Primary-571x379.jpg',
    price: '185.000.000 VND',
    dataColors: ['#4d6087', '#000000'],
    ID: 'bc4e4420f5',
    type: 'road'
  },
  {
    name: 'Madone SLR 7  Gen 6 [2023]',
    imgSrc: 'database\\images\\productImgs\\MadoneSLR7Gen6_23_BLK_Primary-571x379.jpg',
    price: '199.000.000 VND',
    dataColors: ['#000000', '#000000'],
    ID: '2982baaa61',
    type: 'road'
  },
  {
    name: 'Marlin 8  2023',
    imgSrc: 'database\\images\\productImgs\\Marlin8_23_GREY_Primary-571x379.jpg',
    price: '29.900.000 VND',
    dataColors: ['#4c4c4c', '#000000'],
    ID: '25b42fd79d',
    type: 'mountain'
  },
  {
    name: 'Marlin 7 2023',
    imgSrc: 'database\\images\\productImgs\\Marlin7_23_36967_B_Primary-571x379.jpg',
    price: '21.900.000 VND',
    dataColors: ['#18a4ac', '#000000'],
    ID: '669b475aa2',
    type: 'mountain'
  },
  {
    name: 'Marlin 6 2023',
    imgSrc: 'database\\images\\productImgs\\Marlin6_23_BLU-571x379.jpg',
    price: '17.900.000 VND',
    dataColors: ['#212857', '#303be0'],
    ID: 'e31575131b',
    type: 'mountain'
  },
  {
    name: 'Supercaliber 9.9 AXS',
    imgSrc: 'database\\images\\productImgs\\Supercaliber99AXS_20_28896_A_Primary-571x379.jpg',
    price: '270.000.000 VND',
    dataColors: ['#2d2d2d', '#bcb5ad'],
    ID: '81c705846c',
    type: 'mountain'
  },
  {
    name: 'X-Caliber 9 [2022-2023]',
    imgSrc: 'database\\images\\productImgs\\XCaliber9_22_35112_A_Primary-571x379.jpg',
    price: '41.900.000 VND',
    dataColors: ['#1e73be', '#999999'],
    ID: '9fa4ab8134',
    type: 'mountain'
  },
  {
    name: 'Top Fuel 5',
    imgSrc: 'database\\images\\productImgs\\TopFuel5_23-571x379.jpg',
    price: '79.000.000 VND',
    dataColors: ['#dd9933', '#262626'],
    ID: '0388a00ab8',
    type: 'mountain'
  },
  {
    name: 'Fuel EX 5  2022',
    imgSrc: 'database\\images\\productImgs\\FueL_EX5-2022-571x379.jpg',
    price: '75.000.000 VND',
    dataColors: ['#000000', '#565656'],
    ID: '14caf8beef',
    type: 'mountain'
  },
  {
    name: 'Slash 7 2022',
    imgSrc: 'database\\images\\productImgs\\Slash7DeoreXT_22_Primary-571x379.jpg',
    price: '89.000.000 VND',
    dataColors: ['#083802', '#b54029'],
    ID: 'bc345da7f2',
    type: 'mountain'
  },
  {
    name: 'Madone SLR 7 eTap [2022]',
    imgSrc: 'database\\images\\productImgs\\MadoneSLR7eTap_22_35744_F_Primary-571x379.jpg',
    price: '199.000.000 VND',
    dataColors: ['#ff3a3a', '#f2ff00'],
    ID: 'b9adc8b6a2',
    type: 'road'
  },
  {
    name: 'Speed Concept SLR 6 eTap',
    imgSrc: 'database\\images\\productImgs\\SpeedConceptSLR6eTap_22_35754_D_Primary-571x379.jpg',
    price: '210.000.000 VND',
    dataColors: ['#ff0000', '#000000'],
    ID: 'e855b67526',
    type: 'road'
  },
  {
    name: 'Procaliber 9.7 [2022]',
    imgSrc: 'database\\images\\productImgs\\Procaliber97_22_35114_B_Primary-571x379.jpg',
    price: '99.000.000 VND',
    dataColors: ['#0092e8', '#00127c'],
    ID: '1c10fc84cf',
    type: 'mountain'
  },
  {
    name: 'Speed Concept SLR 7',
    imgSrc: 'database\\images\\productImgs\\Speed-Concept-SLR-7_2023-571x379.jpg',
    price: '225.000.000 VND',
    dataColors: ['#000000', '#232323'],
    ID: '1e03ac7f02',
    type: 'road'
  },
  {
    name: 'FX 3 Disc',
    imgSrc: 'database\\images\\productImgs\\FX3Disc_22_35021_B_Primary-1-571x379.jpg',
    price: '23.900.000 VND',
    dataColors: ['#7c0000', '#ff0800'],
    ID: '066c2f713e',
    type: 'touring'
  },
  {
    name: 'Supercaliber 9.7',
    imgSrc: 'database\\images\\productImgs\\Supercaliber97_22_35149_A_Primary-571x379.jpg',
    price: '130.000.000 VND',
    dataColors: ['#383838', '#cc0000'],
    ID: '65e618e3dd',
    type: 'mountain'
  },
  {
    name: 'Madone SL 7 eTap [2022]',
    imgSrc: 'database\\images\\productImgs\\MadoneSL7eTap_22_35180_A_Primary-571x379.jpg',
    price: '165.000.000 VND',
    dataColors: ['#080054', '#00b7ef'],
    ID: 'c5c17bdedf',
    type: 'road'
  },
  {
    name: 'Émonda SL 6 [2022]',
    imgSrc: 'database\\images\\productImgs\\EmondaSL6Disc_21_32561_A_Primary-571x379.jpg',
    price: '85.000.000 VND',
    dataColors: ['#464f3d', '#464f3d'],
    ID: 'ac0cdebf9b',
    type: 'road'
  },
  {
    name: 'Checkpoint SL 5',
    imgSrc: 'database\\images\\productImgs\\CheckpointSL5_22_35169_B_Primary-571x379.jpg',
    price: '89.000.000 VND',
    dataColors: ['#d10000', '#d10000'],
    ID: 'eb65cd066a',
    type: 'road'
  },
  {
    name: 'Domane SL 5 [2023] Gen 3',
    imgSrc: 'database\\images\\productImgs\\DomaneSL5_22_35298_A_Primary-571x379.jpg',
    price: '89.000.000 VND',
    dataColors: ['#383838', '#895700'],
    ID: '9581992d38',
    type: 'road'
  },
  {
    name: 'Procaliber 9.8 [2021]',
    imgSrc: 'database\\images\\productImgs\\Procaliber98_21_33269_A_Primary-571x379.jpg',
    price: '125.000.000 VND',
    dataColors: ['#ff7f00', '#000000'],
    ID: 'bcd3b9137b',
    type: 'mountain'
  },
  {
    name: 'Madone SL 6 Disc [2022]',
    imgSrc: 'database\\images\\productImgs\\MadoneSL6_22_35177_B_Primary-571x379.jpg',
    price: '120.000.000 VND',
    dataColors: ['#f20000', '#f20000'],
    ID: 'bd94dff5bc',
    type: 'road'
  },
  {
    name: 'X-Caliber 8 [2022-2023]',
    imgSrc: 'database\\images\\productImgs\\XCaliber8_23_Primary_BLU-571x376.jpg',
    price: '30.900.000 VND',
    dataColors: ['#240e87', '#ffffff'],
    ID: '8e29b90a23',
    type: 'mountain'
  },
  {
    name: 'Procaliber 9.6 [2022-2023]',
    imgSrc: 'database\\images\\productImgs\\Procaliber96_22_35113_B_Primary-571x379.jpg',
    price: '79.900.000 VND',
    dataColors: ['#daf722', '#0a0a0a'],
    ID: 'eaecf3b267',
    type: 'mountain'
  },
  {
    name: 'Supercaliber 9.6',
    imgSrc: 'database\\images\\productImgs\\Supercaliber96_22_35151_B_Primary-571x379.jpg',
    price: '110.000.000 VND',
    dataColors: ['#d10000', '#d10000'],
    ID: 'b1c8e82306',
    type: 'mountain'
  },
  {
    name: 'FX 2 Disc',
    imgSrc: 'database\\images\\productImgs\\FX2Disc_22_35003_B_Primary-1-571x379.jpg',
    price: '16.500.000 VND',
    dataColors: ['#ed2700', '#ed2700'],
    ID: '77275b0665',
    type: 'touring'
  },
  {
    name: 'FX1 Stagger Disc 2022',
    imgSrc: 'database\\images\\productImgs\\FX1StaggerDisc_22_35002_A_Primary-571x379.jpg',
    price: '13.900.000 VND',
    dataColors: ['#e5dcb3', '#2d1d00'],
    ID: 'a037700ee4',
    type: 'touring'
  },
  {
    name: 'FX 1 Disc',
    imgSrc: 'database\\images\\productImgs\\FX1Disc_22_35001_B_Primary-1-571x379.jpg',
    price: '13.900.000 VND',
    dataColors: ['#d10000', '#d8b682'],
    ID: 'ae4d9c18aa',
    type: 'touring'
  },
  {
    name: 'Marlin 6 2022',
    imgSrc: 'database\\images\\productImgs\\Marlin6_22_35066_A_Primary-571x379.jpg',
    price: '16.500.000 VND',
    dataColors: ['#424242', '#dd003b'],
    ID: '2444a38c64',
    type: 'mountain'
  },
  {
    name: 'Precaliber 24 8SP SUS Girl’s [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber248speedSuspension_23_36846_D_Primary-571x379.jpg',
    price: '9.500.000 VND',
    dataColors: ['#00c7ce', '#8224e3'],
    ID: 'ae4e338edf',
    type: 'kids'
  },
  {
    name: 'Domane AL 2 Disc',
    imgSrc: 'database\\images\\productImgs\\DomaneAL2Disc_21_33083_A_Primary-571x379.jpg',
    price: '24.900.000 VND',
    dataColors: ['#00439b', '#e5e5e5'],
    ID: 'a919020696',
    type: 'road'
  },
  {
    name: 'Marlin 5',
    imgSrc: 'database\\images\\productImgs\\Marlin5_22_34587_C_Primary-571x379.jpg',
    price: '12.900.000 VND',
    dataColors: ['#00e5ed', '#d1f200'],
    ID: 'b61d9a4700',
    type: 'mountain'
  },
  {
    name: '520 Grando',
    imgSrc: 'database\\images\\productImgs\\520Allroad_21_33474_A_Primary-571x379.jpg',
    price: '35.900.000 VND',
    dataColors: ['#0f335b', '#0f335b'],
    ID: '97d596242b',
    type: 'touring'
  },
  {
    name: 'Dual Sport 4 2021',
    imgSrc: 'database\\images\\productImgs\\DualSport4_21_32898_A_Primary-571x379.jpg',
    price: '27.500.000 VND',
    dataColors: ['#2b2b2b', '#2b2b2b'],
    ID: '355d23e8ac',
    type: 'touring'
  },
  {
    name: 'FX Sport 4',
    imgSrc: 'database\\images\\productImgs\\FXSport_Carbon_GREY-571x379.jpg',
    price: '69.900.000 VND',
    dataColors: ['#1e1e1e', '#c1c1c1'],
    ID: '960b116de9',
    type: 'touring'
  },
  {
    name: 'Roscoe 7',
    imgSrc: 'database\\images\\productImgs\\Roscoe7_20_28499_A_Primary-571x379.jpeg',
    price: '29.900.000 VND',
    dataColors: ['#000000', '#4f3c00'],
    ID: '537bc9f582',
    type: 'mountain'
  },
  {
    name: 'Top Fuel 9.9 X01',
    imgSrc: 'database\\images\\productImgs\\Trek-Top-Fuel-99-X01-Primary-571x379.jpg',
    price: '179.000.000 VND',
    dataColors: ['#000000', '#828282'],
    ID: 'bb681a1b5c',
    type: 'mountain'
  },

  {
    name: 'Émonda ALR 4 Disc',
    imgSrc: 'database\\images\\productImgs\\EmondaALR4Disc_21_33078_B_Primary-571x379.jpeg',
    price: '39.900.000 VND',
    dataColors: ['#dd3333', '#ffcb23'],
    ID: '73463ff18a',
    type: 'road'
  },
  {
    name: 'Khung sườn Procaliber',
    imgSrc: 'database\\images\\productImgs\\ProcaliberFrameset_21_33241_A_Primary-571x379.jpg',
    price: '45.000.000 VND',
    dataColors: ['#ffffff', '#dd3333'],
    ID: 'e6bc7b7e4e',
    type: 'frame'
  },
  {
    name: 'Procaliber 9.5[2022-2023]',
    imgSrc: 'database\\images\\productImgs\\Procaliber95_21_33258_B_Primary-571x379.jpg',
    price: '65.000.000 VND',
    dataColors: ['#dd3333', '#ffd800'],
    ID: 'dde8f97b66',
    type: 'mountain'
  },
  {
    name: 'Verve 1 Disc Lowstep',
    imgSrc: 'database\\images\\productImgs\\Verve1DiscLowStep_21_32736_B_Primary-571x379.jpeg',
    price: '13.500.000 VND',
    dataColors: ['#fff9ef', '#ffb656'],
    ID: 'e2c9d249b5'
  },
  {
    name: 'Émonda SL 7 eTap',
    imgSrc: 'database\\images\\productImgs\\EmondaSL7eTap_23_36978_A_Primary-571x379.jpg',
    price: '159.000.000 VND',
    dataColors: ['#212121', '#000000'],
    ID: '791bc91dcb',
    type: 'road'
  },
  {
    name: 'Émonda SL 5 Disc',
    imgSrc: 'database\\images\\productImgs\\EmondaSL5Disc_BLUE_hero-571x379.jpg',
    price: '79.000.000 VND',
    dataColors: ['#00053d', '#0925c1'],
    ID: '7bd6ff17f3',
    type: 'road'
  },

  {
    name: 'Émonda SL 6 Pro',
    imgSrc: 'database\\images\\productImgs\\EmondaSL6DiscPro_22601812_Primary-571x379.jpg',
    price: '100.000.000 VND',
    dataColors: ['#313933', '#313933'],
    ID: '0712cfed41',
    type: 'road'
  },
  {
    name: 'Khung Émonda SL Disc',
    imgSrc: 'database\\images\\productImgs\\EmondaSLDiscFrameset_21_32688_A_Primary-571x379.jpg',
    price: '39.900.000 VND',
    dataColors: ['#000000', '#dd3333'],
    ID: '0d47d010f9',
    type: 'frame'
  },
  {
    name: 'Crockett 4 Disc',
    imgSrc: 'database\\images\\productImgs\\Crockett-4-Disc-BLK-Primary-571x379.jpg',
    price: '45.000.000 VND',
    dataColors: ['#000000', '#cccccc'],
    ID: '7ee97a25a7',
    type: 'road'
  },
  {
    name: 'Khung sườn Procaliber',
    imgSrc: 'database\\images\\productImgs\\2077100_2017_A_1_Procaliber_Frameset-571x379.jpeg',
    price: '45.000.000 VND',
    dataColors: ['#000000', '#969696'],
    ID: 'cf0dcaa8e3',
    type: 'frame'
  },
  {
    name: 'Marlin 4',
    imgSrc: 'database\\images\\productImgs\\Marlin4_23_BLU-571x379.jpg',
    price: '11.500.000 VND',
    dataColors: ['#1e73be', '#ffffff'],
    ID: '4d445185c4',
    type: 'mountain'
  },
  {
    name: 'Supercaliber 9.9 XX1',
    imgSrc: 'database\\images\\productImgs\\Supercaliber-99-XX1-CNBLK-2021-571x379.jpg',
    price: '270.000.000 VND',
    dataColors: ['#2d2d2d', '#bcb5ad'],
    ID: 'd2007de4a0',
    type: 'mountain'
  },
  {
    name: 'Supercaliber 9.8 GX',
    imgSrc: 'database\\images\\productImgs\\Supercaliber98GX_22_35147_B_Primary-571x379.jpg',
    price: '150.000.000 VND',
    dataColors: ['#2d2d2d', '#bcb5ad'],
    ID: '263c7d8586',
    type: 'mountain'
  },
  {
    name: 'Fuel EX 9.7',
    imgSrc: 'database\\images\\productImgs\\TK-FuelEX-97-20-BLU-571x379.jpg',
    price: '109.000.000 VND',
    dataColors: ['#04afed', '#12e2db'],
    ID: 'e203fc3ff5',
    type: 'mountain'
  },
  {
    name: 'Precaliber 20 7SP Girl’s [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber207speed_23_36268_D_Primary-571x379.jpg',
    price: '7.900.000 VND',
    dataColors: ['#42d6d6', '#4c00db'],
    ID: '7bf1b05395',
    type: 'kids'
  },
  {
    name: 'Precaliber 20 SS Boy’s [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber20_23_36271_B_Primary-571x379.jpg',
    price: '6.900.000 VND',
    dataColors: ['#dd3333', '#081438'],
    ID: 'ae00f7b857',
    type: 'kids'
  },
  {
    name: 'Precaliber 24 8SP SUS Boy’s [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber248speedSuspension_23_36846_A_Primary-571x379.jpg',
    price: '9.500.000 VND',
    dataColors: ['#424242', '#eeee22'],
    ID: '93329b52eb',
    type: 'kids'
  },
  {
    name: 'Precaliber 20 7SP Boys’ [2023]',
    imgSrc: 'database\\images\\productImgs\\Precaliber207speed_23_36268_B_Primary-571x379.jpg',
    price: '7.900.000 VND',
    dataColors: ['#f75238', '#000544'],
    ID: 'ea9586ccbd',
    type: 'kids'
  },
  {
    name: 'Khung 520',
    imgSrc: 'database\\images\\productImgs\\520Disc_19_RED_FS-571x379.jpg',
    price: '12.000.000 VND',
    dataColors: ['#d10000', '#d10000'],
    ID: 'e229a7ef64',
    type: 'frame'
  },
  {
    name: 'Khung sườn Madone SLR Disc',
    imgSrc: 'database\\images\\productImgs\\MadoneSLRDiscFrameset_21_33044_A_Primary-571x379.jpg',
    price: '75.000.000 VND',
    dataColors: ['#870000', '#000000'],
    ID: '6262e8a23a',
    type: 'frame'
  },
  {
    name: '520',
    imgSrc: 'database\\images\\productImgs\\520Disc_19_24000_A_Primary-571x379.jpg',
    price: '31.900.000 VND',
    dataColors: ['#d10000', '#d10000'],
    ID: '887d9623b4',
    type: 'touring'
  },
  {
    name: 'MT-201',
    imgSrc: 'database\\images\\productImgs\\Trek-MT-201-571x379.jpg',
    price: '5.999.000 VND',
    dataColors: ['#000000', '#a3a3a3'],
    ID: '8845da7027',
    type: 'kids'
  },
  {
    name: '820 WSD',
    imgSrc: 'database\\images\\productImgs\\Trek_820_Women_BLUBLK-571x379.jpg',
    price: '9.500.000 VND',
    dataColors: ['#03c8ee', '#000000'],
    ID: '92b6ce9636',
    type: 'mountain'
  }
];


if(!localStorage.getItem("productsPush")){
  localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(DUMMY_PRODUCTS));

  localStorage.setItem("productsPush",true);
}

export default DUMMY_PRODUCTS;
