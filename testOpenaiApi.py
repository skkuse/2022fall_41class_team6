
import os
import openai


os.environ["My_OpenAI_key"] = "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"
openai.api_key = "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"
completion = openai.Completion()

inputCode = "print('hello world')"
prompt = inputCode

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt="class Log:\n    def __init__(self, path):\n        dirname = os.path.dirname(path)\n        os.makedirs(dirname, exist_ok=True)\n        f = open(path, \"a+\")\n\n        # Check that the file is newline-terminated\n        size = os.path.getsize(path)\n        if size > 0:\n            f.seek(size - 1)\n            end = f.read(1)\n            if end != \"\\n\":\n                f.write(\"\\n\")\n        self.f = f\n        self.path = path\n\n    def log(self, event):\n        event[\"_event_id\"] = str(uuid.uuid4())\n        json.dump(event, self.f)\n        self.f.write(\"\\n\")\n\n    def state(self):\n        state = {\"complete\": set(), \"last\": None}\n        for line in open(self.path):\n            event = json.loads(line)\n            if event[\"type\"] == \"submit\" and event[\"success\"]:\n                state[\"complete\"].add(event[\"id\"])\n                state[\"last\"] = event\n        return state\n\n\"\"\"\nHere's what the above class is doing:\n1.",
  temperature=0.1,
  max_tokens=64,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0,
  stop=["\"\"\""]
)

print("jhbae")
print(response)