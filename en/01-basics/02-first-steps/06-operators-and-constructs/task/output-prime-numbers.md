
# Output prime numbers 

A number is <i>prime</i> if it has exactly two divisors: 1 and itself. 
Or, in other words, <code>n&gt;1</code> is prime if numbers `2..n-1` all divide `n` with a non-zero remainder. 

Create a code which outputs all primes less than 10. There should be 2,3,5,7.

P.S. The code should also work if 100, 1000, any other value in place of 10.





=Hint 1

The scheme of solution:
[js]
for i from 1 to 10 {
  loop over all numbers less than i {
    if a number divides without a remainder go next i
  }
  i is prime
}
[/js]

=Solution

The solution:

[js run]
next_prime: 
for(var i=2; i<10; i++) {

  for(var j=2; j<i; j++) {
    if ( i % j == 0) continue next_prime
  }
  
  alert(i)  // prime
}
[/js]

