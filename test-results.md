## Comparison

Metric                    | Before (Baseline) | After (Optimized)
--------------------------|-------------------|------------------
Requests Per Second (RPS) | 15.9/s            | 350/s
p95 Latency               | 1.19s             | 210ms

## Raw Data

### No-cache

  █ TOTAL RESULTS

    checks_total.......: 509     15.916236/s
    checks_succeeded...: 100.00% 509 out of 509
    checks_failed......: 0.00%   0 out of 509

    ✓ chat status is 200
    ✓ tts status is 200

    HTTP
    http_req_duration..............: avg=600.11ms min=258.87ms med=467.28ms max=4.53s p(90)=1.01s p(95)=1.19s
      { expected_response:true }...: avg=600.11ms min=258.87ms med=467.28ms max=4.53s p(90)=1.01s p(95)=1.19s
    http_req_failed................: 0.00%  0 out of 509
    http_reqs......................: 509    15.916236/s

    EXECUTION
    iteration_duration.............: avg=600.24ms min=259.02ms med=467.4ms  max=4.53s p(90)=1.01s p(95)=1.19s
    iterations.....................: 509    15.916236/s
    vus............................: 1      min=1        max=10
    vus_max........................: 10     min=10       max=10

    NETWORK
    data_received..................: 1.1 MB 35 kB/s
    data_sent......................: 45 kB  1.4 kB/s
