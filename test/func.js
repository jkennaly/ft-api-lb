// test/func.js
// 610 183
// 99 1
// 86 2
// 397 250
// 397 250
// 368 204
// 471 315
// 474 307
// 430 343
// 492 281
// 415 347
// 508 254
// 541 147
// 544 144
// 616 49
// 622 40
// 626 36
// 631 31
// 631 24
// 631 6
// 633 2
// 635 1
// 635 0

//pre-request script for a non-200 status
pm.variables.set("expectError", true)

//test script for error
pm.test("Status code is 422", function () {
    pm.variables.set("expectError", false)
    pm.response.to.have.status(422)
    pm.response.status.to.be.oneOf([400, 404, 422])
})