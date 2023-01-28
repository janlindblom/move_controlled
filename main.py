def on_received_number(receivedNumber):
    global current_command
    current_command = receivedNumber
radio.on_received_number(on_received_number)

headlights = 0
current_command = 0
current_command = 0
strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
strip.clear()
strip.show()
radio.set_group(42)
kitronik_servo_lite.neutral()
kitronik_servo_lite.stop()
strip.show_rainbow(1, 5)
strip.show()
for index in range(4):
    strip.rotate(1)
    strip.show()
    basic.pause(500)
basic.pause(500)
strip.clear()
strip.show()

def on_forever():
    global headlights, current_command
    headlights = 255 - input.light_level() * 3
    if input.light_level() < 85:
        strip.set_pixel_color(2, neopixel.colors(NeoPixelColors.WHITE))
        while headlights < 50:
            headlights += 1
        strip.set_brightness(headlights)
    elif input.light_level() >= 95:
        strip.set_pixel_color(2, neopixel.colors(NeoPixelColors.BLACK))
    if current_command == 1:
        kitronik_servo_lite.left()
    elif current_command == 2:
        kitronik_servo_lite.right()
    elif current_command == 3:
        kitronik_servo_lite.forward()
    elif current_command == 4:
        kitronik_servo_lite.backward()
    elif current_command == 5:
        kitronik_servo_lite.stop()
    else:
        kitronik_servo_lite.neutral()
        kitronik_servo_lite.stop()
    strip.show()
    current_command = 0
    basic.pause(500)
basic.forever(on_forever)
