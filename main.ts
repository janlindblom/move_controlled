radio.onReceivedNumber(function (receivedNumber) {
    current_command = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    if (calibration == 0) {
        calibration = 1
    } else {
        calibration = 0
    }
})
let headlights = 0
let calibration = 0
let current_command = 0
current_command = 0
let ready = 0
let strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
strip.clear()
strip.show()
radio.setGroup(42)
kitronik_servo_lite.neutral()
kitronik_servo_lite.stop()
strip.showRainbow(1, 5)
strip.show()
for (let index = 0; index < 4; index++) {
    strip.rotate(1)
    strip.show()
    basic.pause(500)
}
basic.pause(500)
strip.clear()
strip.show()
ready = 1
basic.forever(function () {
    if (ready == 1) {
        headlights = 255 - input.lightLevel() * 3
        if (input.lightLevel() < 85) {
            strip.setPixelColor(2, neopixel.colors(NeoPixelColors.White))
            while (headlights < 50) {
                headlights += 1
            }
            strip.setBrightness(headlights)
        } else if (input.lightLevel() >= 95) {
            strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
        }
        if (current_command == 1) {
            kitronik_servo_lite.left()
            strip.setPixelColor(4, neopixel.colors(NeoPixelColors.White))
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
        } else if (current_command == 2) {
            kitronik_servo_lite.right()
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.White))
            strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
        } else if (current_command == 3) {
            kitronik_servo_lite.forward()
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
            strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
        } else if (current_command == 4) {
            kitronik_servo_lite.backward()
        } else if (current_command == 5) {
            kitronik_servo_lite.stop()
        } else {
            kitronik_servo_lite.neutral()
            kitronik_servo_lite.stop()
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
            strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
        }
        strip.show()
        current_command = 0
        basic.pause(500)
    }
})
