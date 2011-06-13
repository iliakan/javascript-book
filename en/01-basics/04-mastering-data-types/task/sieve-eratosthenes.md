
# Sieve of Eratosthenes 

A prime number is a natural number which has exactly two distinct natural number divisors: 1 and itself.

To find all the prime numbers less than or equal to a given integer n by Eratosthenes' Sieve:
<ol>
<li>Create a list of consecutive integers from two to `n: (2, 3, 4, ..., n)`.</li>
<li>Set `p=2`, the first prime number.</li>
<li>Strike from the list all multiples of `p` less than or equal to `n`. (`2p, 3p, 4p`, etc.)</li>
<li>Set p to first not striked number in the list after `p`.</li>
<li>Repeat steps 3-4 until <code>p*p &gt; n</code>.</li>
<li>All the remaining numbers in the list are prime.</li>
</ol>

There is also <a href="/files/tutorial/intro/array/sieve.gif">an animation available</a>.

Implement the Eratosthenes' Sieve in JavaScript. Compute the sum of all primes up to 100 and alert it.






=Solution

The answer is 1060.

The solution is at [play src="/assets/intro/array/sieve.html"].

