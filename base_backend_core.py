"""
Number Guessing Game
A simple console game where the player tries to guess a secret number
within a limited number of attempts.
"""

import random

MIN_NUMBER = 1
MAX_NUMBER = 30
MAX_ATTEMPTS = 6


def get_guess(min_num, max_num):
    while True:
        raw_value = input(f"Enter your guess ({min_num}-{max_num}): ").strip()
        try:
            guess = int(raw_value)
        except ValueError:
            print("That's not a whole number. Try again.")
            continue
        if guess < min_num or guess > max_num:
            print(f"Enter a number between {min_num} and {max_num}.")
            continue
        return guess


def play_round():
    secret_number = random.randint(MIN_NUMBER, MAX_NUMBER)
    attempts_used = 0

    print(f"\nI'm thinking of a number between {MIN_NUMBER} and {MAX_NUMBER}.")
    print(f"You have {MAX_ATTEMPTS} attempts.\n")

    while attempts_used < MAX_ATTEMPTS:
        guess = get_guess(MIN_NUMBER, MAX_NUMBER)
        attempts_used += 1

        if guess < secret_number:
            print("Too Low")
        elif guess > secret_number:
            print("Too High")
        else:
            print(f"Correct Guess! You got it in {attempts_used} attempt(s).")
            return True

        remaining = MAX_ATTEMPTS - attempts_used
        if remaining > 0:
            print(f"Attempts left: {remaining}\n")

    print(f"\nOut of attempts. The number was {secret_number}.")
    return False


def main():
    print("=" * 42)
    print("     WELCOME TO THE NUMBER GUESSING GAME")
    print("=" * 42)

    while True:
        play_round()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again != "y":
            print("Thanks for playing. Goodbye!")
            break


if __name__ == "__main__":
    main()