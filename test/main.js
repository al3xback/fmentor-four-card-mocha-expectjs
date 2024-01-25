import expect from 'expect.js';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-expectjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have only one section element', () => {
		const sectionEls = document.querySelectorAll('section');

		expect(sectionEls.length).to.eql('1');
	});

	it('should have a string type of card title inside card list element', () => {
		const cardTitleEls = document.querySelectorAll('.card__title');

		for (let i = 0; i < cardTitleEls.length; i++) {
			const cardTitle = cardTitleEls[i].textContent;
			expect(cardTitle).to.be.a('string');
		}
	});

	it("should have a word 'Artificial Intelligence' in section description element", () => {
		const sectionDesc = document.querySelector(
			'.cards-summary__desc'
		).textContent;

		expect(sectionDesc).to.contain('Artificial Intelligence');
	});
});
