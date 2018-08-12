import Scene from "../../src/Scene";
import { hasClass } from "../../src/utils/css";
import { START_ANIMATION } from "../../src/consts";
/* eslint-disable */


describe("Scene Test", function() {
    describe("test Scene initialize", function() {
        it("should check default Scene", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
				},
            });


			// Then
			expect(scene.getItem("item").get(0, "a")).to.be.equals(1);
			expect(scene.getDuration()).to.be.equals(1);
        });
	});
    describe("test Scene method", function() {
		it("should check 'newItem' method", function() {
			const scene = new Scene({
				"item": {},
            });

			// When
			const item2 = scene.newItem("item2");
			const duplicateItem2 = scene.newItem("item2");

			expect(item2).to.be.equal(duplicateItem2);
		});
        it("should check 'getDuration' method", function() {
            const scene = new Scene({
				"item": {},
            });

			const noItemDuration = scene.getDuration();

			// When
			scene.getItem("item").set(0, "opacity", 0);

			const duration = scene.getDuration();

			scene.getItem("item").set(1, "opacity", 1);

			const duration2 = scene.getDuration();

			scene.newItem("item2").set(3, "opacity", 2);

			const duration3 = scene.getDuration();

			// Then
			expect(noItemDuration).to.be.equals(0);
			expect(duration).to.be.equals(0);
			expect(duration2).to.be.equals(1);
			expect(duration3).to.be.equals(3);
        });
        it("should check 'setDuration' method", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					}
				},
            });

			const duration = scene.getDuration();

			// When
			scene.setDuration(4);

			// Then
			expect(duration).to.be.equals(2);
			expect(scene.getDuration()).to.be.equals(4);
		});
        it("should check 'setDuration' method(item's duration is infinite)", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					},
					options: {
						iterationCount: "infinite",
					}
				},
            });



			// When
			scene.setDuration(4);

			// Then
			expect(scene.getDuration()).to.be.not.finite;
        });
	});
	describe("test Scene events", function() {
        beforeEach(() => {
            this.scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					},
				},
				"item2": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
				},
            });
        });
        afterEach(() => {
            this.scene = null;
        });
        it("should check 'animate' event", done => {
            const scene = this.scene;

			const items = {
				item: {

				},
				item2: {

				}
			};
            scene.on("animate", ({target, time, frame, currentTime}) => {
                items[target.getId()][parseInt(time, 10)] = true;
            });

			scene.setTime(0.5);


			expect(items.item[0]).to.be.true;
			expect(items.item2[0]).to.be.true;
			done();
		});
		it (`should check forEach method`, () => {
			const scene = new Scene({
				".test": {
					0: {
						width: "100px",
						height: "100px",
					},
					1: {
						width: "200px",
						height: "200px",
					}
				},
				".test2": {
					0: {
						width: "200px",
						height: "200px",
					},
					1: {
						width: "100px",
						height: "100px",
					}
				}
			});
			const test = {};
			let test2 = {};

			scene.forEach((item, name, items) => {
				test[name] = item;
				test2 = items;
			});
			expect(test[".test"]).to.be.ok;
			expect(test[".test2"]).to.be.ok;
			expect(test[".test"].get(0, "width")).to.be.equals("100px");
			expect(test[".test2"].get(0, "width")).to.be.equals("200px");
			expect(test).to.be.deep.equals(test2);
		});
	});
	describe(`test body's element`, () => {
		beforeEach(() => {
			document.body.innerHTML = `<div class="test"></div>`;
		});
		afterEach(() => {
			document.body.innerHTML = "";
		});
		it (`should check Scene load`, () => {
			const scene = new Scene({
				".test": {
					0: {
						width: "100px",
						height: "100px",
					},
					1: {
						width: "200px",
						height: "200px",
					}
				},
			}, {
				selector: true,
			});

			expect(scene.getItem(".test")._elements.length).to.be.equals(1);
		});
		it (`should check load options`, () => {
			const scene = new Scene({
				".test": {
					0: {
						width: "100px",
						height: "100px",
					},
					1: {
						width: "200px",
						height: "200px",
					}
				},
				options: {
					selector: true,
				}
			});

			expect(scene.getItem(".test")._elements.length).to.be.equals(1);
		});
		it (`should check playCSS method`, done => {
			const scene = new Scene({
				".test": {
					0: {
						width: "100px",
						height: "100px",
					},
					0.1: {
						width: "200px",
						height: "200px",
					}
				},
				options: {
					selector: true,
				}
			});

			scene.playCSS();

			expect(hasClass(document.querySelector(".test"), START_ANIMATION)).to.be.true;
			expect(scene.getPlayState()).to.be.equals("running");
			scene.on("ended", e => {
				expect(scene.getPlayState()).to.be.equals("paused");
				done();
			});
		});
		it (`should check playCSS method with iteration count = 2`, done => {
			const scene = new Scene({
				".test": {
					0: {
						width: "100px",
						height: "100px",
					},
					0.1: {
						width: "200px",
						height: "200px",
					}
				},
				options: {
					iterationCount: 2,
					selector: true,
				}
			});
			scene.playCSS();

			expect(hasClass(document.querySelector(".test"), START_ANIMATION)).to.be.true;
			expect(scene.getPlayState()).to.be.equals("running");

			const spy = sinon.spy();

			scene.on("iteration", spy);
			scene.on("ended", e => {
				expect(spy.calledOnce).to.be.true;
				expect(scene.getPlayState()).to.be.equals("paused");
				done();
			})
		})
	});
});