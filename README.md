## What is a Race Condition? (The Analogy)

Imagine you and nine friends all decide you want the last cookie from a cookie jar in the kitchen. The rule is: if the jar is empty, you must go to the store to buy more cookies.

A race condition is what happens if you all check the jar at the same time.

    The "Race": All 10 of you sprint to the kitchen.

    The "Shared Resource": The cookie jar (ttsCache).

    The "Condition": Is the jar empty? (!ttsCache.has(words))

    The Action: If it's empty, go to the store (call the slow tts API).

Here's how the race plays out with your flawed caching logic:

    T=0ms: You get to the jar first. You look inside. It's empty. You decide to go to the store.

    T=1ms: Your friend arrives. They also look inside. Since you haven't returned from the store yet, the jar is still empty. They also decide to go to the store.

    T=2ms to T=9ms: Your eight other friends arrive, one by one. They all see the empty jar and every single one of them decides to go to the store.

The result is chaos. Instead of one person going to the store, you now have 10 people stampeding the store at once to buy the same cookies. The store's manager (the Speechify API) gets overwhelmed, thinks it's a robbery (a DDOS attack), and locks the doors (rate-limits you). This is the "thundering herd" problem you experienced, and it's a classic race condition.

## How Your Code Became "Race-Condition-Proof"

Being "race-condition-proof" means you architected your code to prevent this chaos from ever happening. Your final solution does this brilliantly by changing the condition the moment the race begins.

Let's replay the analogy with your final, correct code:

    The Race Starts: All 10 of you sprint to the kitchen.

    T=0ms: You get to the jar first. It's empty. Instead of just leaving for the store, you do two things instantly:

        You take out a sticky note that says, "Promise: I am getting cookies. Wait here." (const ttsPromise = tts(words);)

        You put that note inside the cookie jar. (ttsCache.set(words, ttsPromise);)
        Then you leave for the store.

    T=1ms: Your friend arrives. They look in the jar. It is not empty. It contains your note (the Promise).

    The Logic Changes: Your friend reads the note and knows cookies are on the way. Instead of going to the store themselves, they simply wait next to the jar for you to return (await ttsCache.get(words);).

    T=2ms to T=9ms: Your other eight friends arrive. They all see the same note and also decide to wait patiently.

The result is orderly and efficient. Only one person ever goes to the store. Everyone else waits for the result of that single trip. The race is prevented because the first person to the resource "locks" it by leaving a promise, changing the state from "empty" to "pending."

So, when you say your cache is race-condition-proof, you are communicating to a hiring manager that you understand:

    The dangers of concurrent requests competing for a shared resource.

    How to prevent a "thundering herd" from overwhelming your own or third-party services.

    Sophisticated asynchronous patterns (like caching a promise instead of just the final value) to create stable, high-performance systems.
