# ReMIND

## What it does
ReMIND is a personal conversational AI designed to help dementia patients stay connected with their families. It uses the voice of their loved ones to engage in meaningful conversations, reliving cherished memories. The app also tracks memory retention and mental health through personalized quizzes of their past (short term and long term) and schedule based calls with conversation felt repetitive assessments, helping in analyzing the progression of dementia and helping families understand how much the disease has affected their loved one. It’s a tool to help dementia patients in their condition analysis and memeory loss.

## How it works!
Some of the amazing features of ElevenLabs, such as cloning voice, conversational AI and its connection to phone call based services like twilio got me this idea. 
I built a web application where families can schedule AI conversational calls with their cloned voice giving a past memory context and information about their relation to the patient (like i am aryan and i scheduled one for my grandma about our trip to Kerala). It can be as detailed as possible for providing better context to AI for it to talk. We also include questions on certain events along with answers to AI (ex: which year we went to kerala, who got bit by spider then, what was the name of the resort, etc). We can schedule repetivite calls with time difference between consequtive calls (ex 1 hr, 12hrs, 1 day). It will call them and have the same conversations and based on the answers the patient gives in each slot, we can derive analytics of short and long term memory retention. I used a cron service and the scheduled the call generations using that. Analysis for every slot is pushed to the database from lambda from where the frontend can access and present it to the user (patients' family). 

## Application

<img width="377" alt="Screenshot 2025-02-24 at 1 06 40 AM" src="https://github.com/user-attachments/assets/f7fcd087-468c-4822-b30c-429c0d63e55e" />

## Dashboard with all Scheduled AI calls for different contexts
<img width="377" alt="Screenshot 2025-02-24 at 1 07 42 AM" src="https://github.com/user-attachments/assets/9f8dc063-1b05-4067-8a45-33b4c48540c9" />

## Page for scheduling a new AI call
<img width="377" alt="Screenshot 2025-02-24 at 1 08 36 AM" src="https://github.com/user-attachments/assets/9d8a0b6a-49a1-49fb-86ae-63563a8ccecd" />

## Analytics for an AI call
<img width="1512" alt="Screenshot 2025-02-24 at 1 10 17 AM" src="https://github.com/user-attachments/assets/8b7aed99-485e-4861-9215-45c559ccb7cd" />

