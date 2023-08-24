'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        id: '1',
        ownerId: '1',
        classId: '4',
        address: '111 Vault Lane',
        city: 'Washington',
        state: 'WA',
        country: 'USA',
        lat: 32,
        lng: 34,
        name: 'Crystal Cabin',
        description: 'Great views in Vault City',
        price: 209
      },
      {
        id: '2',
        ownerId: '1',
        classId: '3',
        address: '946 Arrow St',
        city: 'Las Vegas',
        state: 'NV',
        country: 'USA',
        lat: 42,
        lng: 56,
        name: "Getaway Townhouse",
        description: 'Enjoy pleasures of Sin City',
        price: 420
      },
      {
        id: '3',
        ownerId: '1',
        classId: '3',
        address: '337 Arrow St',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 78,
        lng: 82,
        name: 'Canyon Bobcat',
        description: 'Handscrafted cabin in NYC',
        price: '320'
      },
      {
        id: '4',
        ownerId: '1',
        classId: '6',
        address: '1436 Rowling Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 38,
        lng: 42,
        name: 'The Tops Resort',
        description: 'Swanky place right along the Courier River',
        price: '521'
      },
      {
        id: '5',
        ownerId: '1',
        classId: '4',
        address: '222 Burrows Lane',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 25,
        lng: 44,
        name: 'Lucky 38 Cottage',
        description: 'An isolate cottage in Seattle with very cozy vibes.',
        price: '320'
      },
      {
        id: '6',
        ownerId: '1',
        classId: '6',
        address: '3544 Barringstone Ave',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 21,
        lng: 43,
        name: 'The Barringstone Mansion',
        description: 'Luxurious and in pristine condition since the 18th century',
        price: '649'
      },
      {
        id: '7',
        ownerId: '1',
        classId: '3',
        address: '109 Row St',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 18,
        lng: 22,
        name: 'Sky Tower',
        description: 'Perched high on an oceanside hill, the view is to die for.',
        price: '120'
      },
      {
        id: '8',
        ownerId: '1',
        classId: '5',
        address: '8793 Melody Ave',
        city: 'Orlando',
        state: 'FL',
        country: 'USA',
        lat: 55,
        lng: 43,
        name: 'Lakefront Townhouse',
        description: 'A private townhouse right by a lake, offers very convenient quarters to those stopping by.',
        price: '226'
      },
      {
        id: '9',
        ownerId: '1',
        classId: '9',
        address: '407 Beech Ave.',
        city: 'Stockbridge',
        state: 'GA',
        country: 'USA',
        lat: 11,
        lng: 32,
        name: 'Chateau de Laurel',
        description: "This classical French style estate is in the prime location for enjoying all this iconic area has to offer. With an incredible amount of indoor and outdoor space, it's perfect for large scale entertaining, extended family vacations, and maybe even a romantic wedding ceremony.",
        price: 9728
      },
      {
        id: '10',
        ownerId: '1',
        classId: '2',
        address: '88 South Kirkland Drive',
        city: 'Elyria',
        state: 'OH',
        country: 'USA',
        lat: 64,
        lng: 34,
        name: 'The Big Blue at Hamilton Cove!',
        description: 'With 180 degree ocean views and the waves gently splashing against the beach, it is a soothing adventure.  This vacation home includes use of a golf cart, (please see “getting around” section for details) the community’s amenities, pool, spa, health club, 18-hole putting course, tennis courts, croquet court, sand volleyball and beach with built in barbecues and picnic tables.',
        price: 499
      },
      {
        id: '11',
        ownerId: '1',
        classId: '2',
        address: '8321 Honey Creek Dr.',
        city: 'Raleigh',
        state: 'NC',
        country: 'USA',
        lat: 32,
        lng: 66,
        name: 'Escondido Beach Club',
        description: 'Nestled onto Escondido Beach, this Malibu home features seamless access between the open, airy living space and the sprawling outdoors. The backyard oozes onto the sandy shore with daybeds, umbrellas, and loungers ready to comfort you as you snooze or sunbathe before plunging into the ocean.',
        price: 3648
      },
      {
        id: '12',
        ownerId: '1',
        classId: '1',
        address: '8662 Courtland Street',
        city: 'Ronkonkoma',
        state: 'NY',
        country: 'USA',
        lat: 32,
        lng: 31,
        name: 'Paris Invalides Studio Deluxe',
        description: 'Perfectly quiet, this magnificent bright 19m² studio offers a plunging view of the charming nearby church and our beautiful wooded courtyard. It consists of a Palace bed, dining area, fully equipped open kitchen, with dishwasher and washer dryer, shower room with toilet.',
        price: 344
      },
      {
        id: '13',
        ownerId: '1',
        classId: '3',
        address: '37 North Wood Street',
        city: 'East Lansing',
        state: 'MI',
        country: 'USA',
        lat: 11,
        lng: 34,
        name: 'Moonset - Modern Boho Villa Soak & Hot Tub',
        description: 'This is a place for dreamers to reset, reflect, and create. Enjoy stargazing and sunsets from the glass walls or private deck. This magical and picturesque property was created by designers GYPSETTY as a place to find relief, discover new inspirations and reconnect with yourself, loved ones and nature. We do allow pets at our home with a fee and a deposit!',
        price: 476
      },
      {
        id: '14',
        ownerId: '1',
        classId: '1',
        address: '9499 Lilac Drive',
        city: 'Greensburg',
        state: 'PA',
        country: 'USA',
        lat: 12,
        lng: 34,
        name: 'République & Bastille',
        description: 'Loft of 45m2 on 2 levels, formerly sewing workshop, offering a private BALNEO SPA relaxation area, with neat services, quiet, with all the comforts to spend a pleasant stay in Paris, between République and Bastille next to the Atelier des Lumières, in a central and bourgeois area of Paris.',
        price: 109
      },
      {
        id: '15',
        ownerId: '1',
        classId: '1',
        address: '47 Arrowhead Rd.',
        city: 'Mishawaka',
        state: 'IN',
        country: 'USA',
        lat: 55,
        lng: 34,
        name: 'El Coyote by River Park',
        description: 'Our home is set in beautiful Joshua Tree on over 4 acres of pristine high desert; just 3 minutes from downtown Joshua Tree and Park Blvd., leading to the national park.  Spot coyotes, jack rabbits, desert tortoises...from your bedroom!',
        price: 638
      },
      {
        id: '16',
        ownerId: '1',
        classId: '9',
        address: '57 Charles St.',
        city: 'Lithonia',
        state: 'GA',
        country: 'USA',
        lat: 13,
        lng: 54,
        name: 'The Sands Beachfront Pier',
        description: "Welcome to The Sands at Sunset Beach. Pack your bags because you discovered the perfect beach getaway right on the sand. This tranquil bo-ho chic Southern California beachfront home was professionally designed to transport you to the tropical beaches in Tulum.  From sand to sky, you'll have 4 levels of this resort-styled home to soak in the breathtaking multicolored sunsets.",
        price: 2739
      },
      {
        id: '17',
        ownerId: '1',
        classId: '3',
        address: '3 Woodsman St.',
        city: 'Uniontown',
        state: 'PA',
        country: 'USA',
        lat: 15,
        lng: 40,
        name: 'Cape Story de Woods',
        description: "We are a stone's throw from the gorgeous Chesapeake Bay and Seashore State Park; and walking distance to delicious eats including waterfront dining, coffee, groceries, and more. Beach gear is ready!",
        price: 90
      },
      {
        id: '18',
        ownerId: '1',
        classId: '8',
        address: '419 Foster Lane',
        city: 'Simpsonville',
        state: 'SC',
        country: 'USA',
        lat: 29,
        lng: 69,
        name: 'Santa Marta de Portuzelo Castle',
        description: 'The Castle is located 40 minutes from Porto (Francisco Sa Carneiro) airport, with a variety of cultural experiences near the city. You will love this place because of the location, the beautiful grounds and landscaping, the peaceful atmosphere and the unique construction of the house.',
        price: 1099
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options)
  }
};
