const selector = require('../select');

/*
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/
describe('select function', () => {
    const testItems = [
          { id: 8, playTime:  500, auto: false },
          { id: 7, playTime: 1500, auto: true  },
          { id: 1, playTime:  100, auto: true  },
          { id: 7, playTime: 1000, auto: false },
          { id: 7, playTime: 2000, auto: false },
          { id: 2, playTime: 2000, auto: true  },
          { id: 2, playTime: 2000, auto: true  }
    ];

    describe('when no options are passed', () => {
        it('returns the same items', () => {
          expect(selector.select(testItems)).toEqual(testItems);
        });
    });

     describe('when no options are passed', () => {
        const expected = [
             { id: 8, playTime:  500, auto: false },
             { id: 1, playTime:  100, auto: true  },
             { id: 7, playTime: 4500, auto: false },
             { id: 2, playTime: 4000, auto: true  }
         ];
        it('returns the items with same id merged', () => {
          expect(selector.select(testItems, { merge: true })).toEqual(expected);
        });
    });

     describe('when no options are passed', () => {
        const expected = [
             { id: 2, playTime: 2000, auto: true  },
             { id: 2, playTime: 2000, auto: true  }
         ];
        it('returns the items with the given id', () => {
          expect(selector.select(testItems, { id: 2 })).toEqual(expected);
        });
    });

     describe('when minPlay passed is higher than all available', () => {
        const expected = [];
        it('returns the empty array', () => {
          expect(selector.select(testItems, { minPlayTime: 4000 })).toEqual(expected);
        });
    });

    describe('when minPlayTIme and merge are passed the result is with merged items and summed up playTime', () => {
        const expected = [
            { id: 7, playTime: 4500, auto: false },
            { id: 2, playTime: 4000, auto: true  }
        ];
        it('returns the empty array', () => {
          expect(selector.select(testItems, { merge: true, minPlayTime: 4000 })).toEqual(expected);
        });
    });
});
