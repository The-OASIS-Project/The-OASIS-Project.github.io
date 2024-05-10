# The O.A.S.I.S. Project Communication Protocols

<img src="/assets/Communications.png" alt="AURA Logo" width="350" align="right">

## MQTT (Message Queuing Telemetry Transport)

### Definition:
MQTT is a lightweight messaging protocol designed for low-bandwidth, high-latency, or unreliable networks. It facilitates efficient communication between devices and software components.

### Core Concept:
- **Publish-Subscribe Model**: MQTT operates on a publish-subscribe model. Devices or components 'publish' information to a topic, and others 'subscribe' to these topics to receive updates, enabling efficient data exchange.

### Application in OASIS:
- MQTT serves as the communication backbone in OASIS, connecting components like the helmet, repulsors, armor components, other weapons, etc.
- Its lightweight nature ensures minimal latency and resource usage, crucial for OASIS's real-time operations.

### Advantages for OASIS:
- **Flexibility**: Enables connection between any components.
- **Scalability**: Accommodates additional components easily.
- **Reliability**: Maintains stable communication, even in suboptimal network conditions.

MQTT provides OASIS with a modular and robust communication framework, essential for its high-tech functionality.

## A.U.R.A. Communication Protocol
**Note:** While typical device communication is over MQTT, v1 of the A.U.R.A. code uses serial over USB for data since we're already using that for charging.

A.U.R.A. transmits crucial data through structured JSON messages, using the ArduinoJson.h library. Each message contains specific data fields relevant to the device's current readings. The data transmission is categorized into three main types:

### GPS Data Transmission
```json
{
  "device": "GPS",
  "time": "<time>",
  "date": "<date>",
  "fix": <fix_status>,
  "quality": <fix_quality>,
  "latitude": <latitude_value>,
  "latitudeDegrees": <latitude_in_degrees>,
  "lat": <lat>,
  "longitude": <longitude_value>,
  "longitudeDegrees": <longitude_in_degrees>,
  "lon": <lon>,
  "speed": <speed>,
  "angle": <angle>,
  "altitude": <altitude>,
  "satellites": <satellite_count>
}
```

**Units:**

- *time* : UTC time "HH:MM:SS"
- *date* : UTC date "YYYY/MM/DD"
- *fix* : 0/1
- *latitude* : decimal latitude
- *latitudeDegrees* : degrees latitude
- *lat* : N/S
- *longitude* : decimal longitude
- *longitudeDegrees* : degrees longitude
- *lon* : W/E
- *speed* : m/s
- *altitude* : m

**Notes:**

- Real-time GPS data transmission including time, date, location, speed, altitude, and satellite information.
- Data fields are contingent on the status of the GPS fix.
- latitude and longitude is preferred in degrees at this time.
- lat and lon are only applied to decimal values

### Motion Data Transmission
```json
{
  "device": "Motion",
  "format": "Orientation",
  "heading": <heading>,
  "pitch": <pitch>,
  "roll": <roll>
}
```

**Units:**

- *heading* : degrees
- *pitch* : degrees
- *roll* : degrees

**Notes:**

- Orientation data transmission, providing heading, pitch, and roll information.
- Key for understanding the spatial orientation of the helmet.

### Environmental Data Transmission
```json
{
  "device": "Enviro",
  "temp": <temperature>,
  "humidity": <humidity>
}
```

**Units:**

- *temp* : &deg;C
- *humidity* : percent

**Notes:**

- Environmental information like temperature and humidity is transmitted.
- Vital for monitoring and adapting to surrounding environmental conditions.

Each JSON message is serialized and sent via Serial, forming a standardized and efficient communication protocol within the O.A.S.I.S. system. This ensures precise and real-time data handling, integral to the system's functionality.

## S.P.A.R.K. Communication Protocol

The S.P.A.R.K. system in the O.A.S.I.S. project **transmits** key data and commands to ensure precise control and interactive functionality. It uses JSON formatted messages, serialized and transmitted for efficient communication.

### Regular Transmissions from Remote Devices

### Voltage Data Transmission
```json
{
  "device": "<topic>",
  "voltage": <rounded_voltage>
}
```

**Units:**

- *voltage* : volts

**Notes:**

- Transmits voltage data, rounded to two decimal places. This data is used for device health monitoring to notify about low-battery conditions.

### Temperature Data Transmission
```json
{
  "device": "<topic>",
  "temp": <rounded_temperature>
}
```

**Units:**

- *temp* : &deg;C

- Sends temperature readings, rounded to two decimal places. Also used to monitor device health as well as the potential health of the wearer.

### Local Event-Based Audio Commands

### Audio Playback Command
```json
{
  "device": "audio",
  "command": "play",
  "arg1": <sound_identifier>,
  "arg2": <percent start>
}
```

- Initiates audio playback for specific events.
- `arg1` specifies the sound to be played. This is an audio file available on the playback device. Currently supported audio formats: *Ogg Vorbis*
- `arg2` specifies the start percentage of the file. "Where do you start playback?"

**Developer Note:** Percentage seems like an odd 'start time' here but it allows it to be relative to power-up, power-down light percentage. 

### Audio Stop Command
```json
{
  "device": "audio",
  "command": "stop",
  "arg1": <sound_identifier>
}
```

- Stops audio playback for specific events.
- `arg1` identifies which sound to stop. This should match the name of a previously played sound file.

Each of these JSON messages is crafted to convey precise instructions and data to the S.P.A.R.K. system, contributing to a responsive and interactive user experience in the O.A.S.I.S. ecosystem.

**Developer To-Do:** This start/stop playback system was developed when the application of this function was limited. For proper functionality in a much larger, complex system, IDs should be added to the play commands for accurate stopping of identical filenames.

## Generic Device Commands

### Command Configuration for O.A.S.I.S. Devices

The `commands_config_nuevo.json` file specifies command types and actions applicable to different devices in the O.A.S.I.S. system. It outlines action words and corresponding JSON commands for execution.

### Command Types

#### Boolean Commands

Used for enabling or disabling features.

##### Actions

- **Enable**
    * Action Words: "enable %device_name%", "turn on %device_name%", etc.
    * JSON Command: `{"device": "%device_name%", "action": "enable"}`
- **Disable**
    * Action Words: "disable %device_name%", "turn off %device_name%", etc.
    * JSON Command: `{"device": "%device_name%", "action": "disable"}`

#### Analog Commands
Used for setting values or adjusting parameters.

##### Actions

- **Set**
    * Action Words: "set %device_name% to %value%", "adjust %device_name% to %value%", etc.
    * JSON Command: `{"device": "%device_name%", "action": "set", "value": "%value%"}`

##### Usage

Each command type encompasses specific actions. Action words are verbal commands interpreted by the system to execute predefined JSON commands. `%device_name%` and `%value%` are placeholders that will be replaced by specific device names and values during runtime.

## D.A.W.N. Communication Protocol

### Text-to-Speech Commands for DAWN

D.A.W.N., the Digital Assistant for Wearable Neutronics, can interpret and execute Text-to-Speech (TTS) commands. These commands enable DAWN to convert text into spoken words, enhancing the interactive experience.

### Command Structure

The topic for DAWN commands is `dawn`. TTS commands are JSON-formatted and contain the following key-value pairs:

```json
{
  "device": "text to speech",
  "action": "<action_type>",
  "value": "<text_to_speak>"
}
```

- **device**: Specifies that the command is for the Text-to-Speech system.
- **action**: Defines the action to be taken, "play" for TTS reading.
- **value**: The text string that will be converted to speech.

### Example Command

To have DAWN say "Helmet connected.", the command would be:

```json
{
  "device": "text to speech",
  "action": "play",
  "value": "Helmet connected."
}
```

From the command line:

```sh
mosquitto_pub -h <IP> -p <port> -t dawn -m "{ \"device\": \"text to speech\", \"action\": \"play\", \"value\": \"Your hud is shutting down.\" }"
```

### Functionality

- Upon receiving this command, DAWN processes the `"value"`` field through its TTS system.
- The TTS system then audibly speaks the provided text.
- This feature is crucial for auditory feedback and interaction within the O.A.S.I.S. system.

### Customization

- The TTS commands can be customized to convey a wide range of messages and information.
- Text in the `"value"` field can be modified to suit the specific needs of the situation or user interaction.
