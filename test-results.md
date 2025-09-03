## Comparison

Metric                    | Before (Baseline) | After (Optimized)
--------------------------|-------------------|------------------
Requests Per Second (RPS) | 4.80/s            | 6097.9/s
p95 Latency               | 4.14s             | 733.96µs

## Raw Data

### No-cache

  █ TOTAL RESULTS

    checks_total.......: 153     4.805134/s
    checks_succeeded...: 100.00% 153 out of 153
    checks_failed......: 0.00%   0 out of 153

    ✓ tts status is 200
    ✓ chat status is 200

    HTTP
    http_req_duration..............: avg=2.01s min=881.99ms med=1.72s max=9.9s p(90)=3.06s p(95)=4.14s
      { expected_response:true }...: avg=2.01s min=881.99ms med=1.72s max=9.9s p(90)=3.06s p(95)=4.14s
    http_req_failed................: 0.00%  0 out of 153
    http_reqs......................: 153    4.805134/s

    EXECUTION
    iteration_duration.............: avg=2.01s min=882.14ms med=1.72s max=9.9s p(90)=3.07s p(95)=4.14s
    iterations.....................: 153    4.805134/s
    vus............................: 4      min=4        max=10
    vus_max........................: 10     min=10       max=10

    NETWORK
    data_received..................: 1.5 MB 46 kB/s
    data_sent......................: 15 kB  469 B/s

### In-memory cache

  █ TOTAL RESULTS

    checks_total.......: 194929  6097.915692/s
    checks_succeeded...: 100.00% 194929 out of 194929
    checks_failed......: 0.00%   0 out of 194929

    ✓ chat status is 200
    ✓ tts status is 200

    HTTP
    http_req_duration..............: avg=1.54ms min=124.87µs med=412.06µs max=4.13s p(90)=609.19µs p(95)=733.96µs
      { expected_response:true }...: avg=1.54ms min=124.87µs med=412.06µs max=4.13s p(90)=609.19µs p(95)=733.96µs
    http_req_failed................: 0.00%  0 out of 194929
    http_reqs......................: 194929 6097.915692/s

    EXECUTION
    iteration_duration.............: avg=1.57ms min=147.96µs med=435.82µs max=4.13s p(90)=646.27µs p(95)=776.01µs
    iterations.....................: 194929 6097.915692/s
    vus............................: 3      min=3           max=10
    vus_max........................: 10     min=10          max=10

    NETWORK
    data_received..................: 5.1 GB 161 MB/s
    data_sent......................: 21 MB  659 kB/s
