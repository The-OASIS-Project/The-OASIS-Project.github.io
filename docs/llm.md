# Local LLM on Host - FRIDAY/JARVIS Onboard

## Overview

This page is mostly a note pad for some of the work I'm doing to run an LLM locally onboard my host system, rather than having to go to the cloud. This is one of the areas in the most flux at the moment, so this is a snapshot.

## Tools/Software/Models

* llama.cpp - [https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
    * Compiled for NVIDIA CUDA - [https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md#cuda](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md#cuda)
    * Benchmarks run using the cli.
    * Interactivity currently using OpenAI-compatible server.
* Google Gemma 2 2B IT GGUF - [https://huggingface.co/google/gemma-2-2b-it-GGUF](https://huggingface.co/google/gemma-2-2b-it-GGUF)
    * Different quantization for testing (see below).

## Checking out the model - Must login to Hugging Face and accept Google license.

* ```git clone https://huggingface.co/google/gemma-2-2b-it-GGUF```
    * This is the **float32** model converted to GGUF format which is needed for llama.cpp.

## Quantization

* 16-bit Float Quantization
    * ```./build/bin/llama-quantize ../gemma-2-2b-it-GGUF/2b_it_v2.gguf ../gemma-2-2b-it-GGUF/2b_it_v2_F16.gguf F16```

* 8-bit Quantization
    * ```./build/bin/llama-quantize ../gemma-2-2b-it-GGUF/2b_it_v2.gguf ../gemma-2-2b-it-GGUF/2b_it_v2_Q8_0.gguf Q8_0```

* 4-bit Medium Quantization
    * ```./build/bin/llama-quantize ../gemma-2-2b-it-GGUF/2b_it_v2.gguf ../gemma-2-2b-it-GGUF/2b_it_v2_Q4_K_M.gguf Q4_K_M```

### Benchmark

* Example Setup
    * Example: ```build/bin/llama-cli -m ../gemma-2-2b-it-GGUF/2b_it_v2.gguf -p "What is (5+60*60+5)/2. Then tell me in simplest terms why Iron Man armor is special." --gpu-layers 99 --temp 0 --repeat-penalty 1.0```

### Results

```
F32: In memory size: 11.2G
What is (5+60*60+5)/2. Then tell me in simplest terms why Iron Man armor is special.ggml_backend_cuda_graph_compute: disabling CUDA graphs due to batch size > 1 [sa_out-0] [2304 29 1 1]


**Answer:**

1. **(5 + 60 * 60 + 5) / 2** 
   * First, calculate 60 * 60 = 3600
   * Then, add 5 and 5: 3600 + 5 + 5 = 3610
   * Finally, divide by 2: 3610 / 2 = 1805

2. **Iron Man armor is special because:**
   * **It's powered by a highly advanced artificial intelligence (AI) system:**  The AI, known as JARVIS, is responsible for controlling the armor's functions, providing guidance, and even adapting to Tony Stark's needs.
   * **It's incredibly versatile and adaptable:** The armor can change its shape, size, and capabilities to suit various situations. It can fly, shoot lasers, and even transform into different forms.
   * **It's a technological marvel:** The armor is a testament to Tony Stark's genius and the advancements in robotics and materials science. It's a symbol of human ingenuity and the potential for technology to change the world.


Let me know if you'd like to explore any of these points in more detail! 
<end_of_turn> [end of text]

llama_print_timings:        load time =   23714.85 ms
llama_print_timings:      sample time =     121.00 ms /   274 runs   (    0.44 ms per token,  2264.52 tokens per second)
llama_print_timings: prompt eval time =     324.38 ms /    29 tokens (   11.19 ms per token,    89.40 tokens per second)
llama_print_timings:        eval time =   55382.44 ms /   273 runs   (  202.87 ms per token,     4.93 tokens per second)
llama_print_timings:       total time =   56080.57 ms /   302 tokens
Log end


F16: In memory size: 6.3G
What is (5+60*60+5)/2. Then tell me in simplest terms why Iron Man armor is special.ggml_backend_cuda_graph_compute: disabling CUDA graphs due to batch size > 1 [sa_out-0] [2304 29 1 1]


**Answer:**

1. **(5 + 60 * 60 + 5) / 2** 
   * First, calculate 60 * 60 = 3600
   * Then, add 5 and 5: 3600 + 5 + 5 = 3610
   * Finally, divide by 2: 3610 / 2 = 1805

2. **Iron Man armor is special because:**
   * **It's powered by a highly advanced artificial intelligence (AI) system:**  The AI, known as JARVIS, is responsible for controlling the armor's functions, providing guidance, and even adapting to Tony Stark's needs.
   * **It's incredibly versatile and adaptable:** The armor can change its shape, size, and capabilities to suit various situations, from combat to exploration.
   * **It's equipped with cutting-edge technology:**  Iron Man's armor features powerful weapons, energy shields, flight capabilities, and advanced sensors, making it a formidable force.
   * **It's a symbol of innovation and ingenuity:** Tony Stark's creation represents the pinnacle of human technological advancement and the potential for using technology to solve problems and overcome challenges.


Let me know if you'd like to explore any of these points in more detail! 
<end_of_turn> [end of text]

llama_print_timings:        load time =   10965.63 ms
llama_print_timings:      sample time =     129.75 ms /   295 runs   (    0.44 ms per token,  2273.52 tokens per second)
llama_print_timings: prompt eval time =     174.46 ms /    29 tokens (    6.02 ms per token,   166.22 tokens per second)
llama_print_timings:        eval time =   59069.19 ms /   294 runs   (  200.92 ms per token,     4.98 tokens per second)
llama_print_timings:       total time =   59624.49 ms /   323 tokens
Log end


Q8_0: In memory size: 4.1G
What is (5+60*60+5)/2. Then tell me in simplest terms why Iron Man armor is special.ggml_backend_cuda_graph_compute: disabling CUDA graphs due to batch size > 1 [sa_out-0] [2304 29 1 1]


**Answer:**

1. **Calculation:**
   (5 + 60 * 60 + 5) / 2 
   = (5 + 3600 + 5) / 2
   = 3610 / 2
   = 1805

2. **Iron Man Armor:**
   Iron Man's armor is special because it's more than just a suit of armor. It's a complex technological marvel that combines:
   * **Advanced Materials:**  The armor is made of a variety of materials, including titanium, alloys, and ceramics, which are incredibly strong and lightweight.
   * **Powerful Engines:**  The armor is powered by a fusion reactor, which provides it with immense energy and thrust for flight.
   * **Repulsor Beams:**  These powerful energy beams can be used for a variety of purposes, including defense, attack, and even transportation.
   * **Artificial Intelligence:**  The armor is controlled by a sophisticated AI system that allows Tony Stark to interact with it and perform complex tasks.
   * **Integrated Systems:**  The armor is equipped with a wide range of integrated systems, including communication, navigation, and targeting systems.


**In summary:** Iron Man's armor is special because it's a blend of cutting-edge technology, advanced materials, and powerful capabilities that make it a formidable force in the Marvel universe. 
<end_of_turn> [end of text]

llama_print_timings:        load time =    4677.59 ms
llama_print_timings:      sample time =     133.37 ms /   302 runs   (    0.44 ms per token,  2264.36 tokens per second)
llama_print_timings: prompt eval time =     279.30 ms /    29 tokens (    9.63 ms per token,   103.83 tokens per second)
llama_print_timings:        eval time =   46181.93 ms /   301 runs   (  153.43 ms per token,     6.52 tokens per second)
llama_print_timings:       total time =   46850.42 ms /   330 tokens
Log end



Q4_K_M: In memory size: 3.1G
What is (5+60*60+5)/2. Then tell me in simplest terms why Iron Man armor is special.ggml_backend_cuda_graph_compute: disabling CUDA graphs due to batch size > 1 [sa_out-0] [2304 29 1 1]


Here's the breakdown:

**1. Calculate (5 + 60 * 60 + 5) / 2**

* First, calculate 60 * 60 = 3600
* Then, add 5 and 3605: 5 + 3605 = 3610
* Finally, divide by 2: 3610 / 2 = 1805

**2. Iron Man Armor's Specialness**

Iron Man's armor is special for several reasons:

* **Advanced Technology:** The armor is powered by a highly advanced AI system, allowing it to think and act independently. It can process information, make decisions, and even learn from its experiences.
* **Powerful Capabilities:** The armor is equipped with a variety of weapons, including missiles, lasers, and repulsor beams. It can also fly, and its armor is incredibly durable.
* **Unique Design:** The armor is iconic and instantly recognizable. Its sleek design and futuristic aesthetic make it a symbol of innovation and technological advancement.
* **Emotional Connection:** Tony Stark, the creator of the armor, imbues it with his personality and emotions. This creates a unique bond between the user and the suit, making it more than just a tool.
* **Symbol of Hope:** Iron Man represents hope and resilience. He uses his powers to fight for justice and protect the innocent.


Let me know if you have any other questions! 
<end_of_turn> [end of text]

llama_print_timings:        load time =    3900.83 ms
llama_print_timings:      sample time =     142.01 ms /   316 runs   (    0.45 ms per token,  2225.23 tokens per second)
llama_print_timings: prompt eval time =     364.24 ms /    29 tokens (   12.56 ms per token,    79.62 tokens per second)
llama_print_timings:        eval time =   37616.86 ms /   315 runs   (  119.42 ms per token,     8.37 tokens per second)
llama_print_timings:       total time =   38389.38 ms /   344 tokens
Log end
```

### Running the OpenAI Compatible Server

`build/bin/llama-server -m ../gemma-2-2b-it-GGUF/2b_it_v2_Q8_0.gguf --gpu-layers 99 --temp 0 --chat-template gemma -if`