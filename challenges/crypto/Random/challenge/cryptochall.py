import random
def xor_string(input_string, key):
    result = ""
    for char in input_string:
        result += chr(ord(char) ^ key)
    return result

user_input = input("Enter a string to XOR: ")

# Generate a random key between 100 and 500
random_key = random.randint(100, 500)

encrypted_string = xor_string(user_input, random_key)

print("Encrypted String:", encrypted_string)

OUTPUT = "ᆢᆢᆲᆂᆕᆇᆺᆳᇵᆯᆥᆮᆬᆞᇵᆨᆯᇶᆞᇶᆩᇵᇶᆞᆳᇵᆯᆥᆮᆬᆞᇰᇴᆞᇰᇶᆼ"
