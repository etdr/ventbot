
# Ventbot


This is a combo Twitch/Discord bot for hooking Twitch streams into the scheduled guild events system which Discord introducted awhile back.

The use case here is, my friend notifies his server through a **#video-and-stream-pings** channel that exists solely for that purpose. He publishes his streaming schedule as an image to either that pings channel or a separate **#announcements** channel tagging **@everyone**. His main reason for not using the Discord scheduled events system, where all the upcoming streams would show up in the server's events list, is that (at least at the time) Discord would only notify those server members who had opted into it by clicking a button on the event. Since he streams at least thrice a week, this means everyone who should be notified (all members, on his server) has to click on every event every single time for the notification, which wasn't going to work.

My solution, Ventbot, keeps the #pings channel but automatically does the pinging upon detection of the start of a Twitch stream.

After it is set up:
  1. You create scheduled events in your Discord server (guild).
  2. Every time you start streaming on Twitch, the bot looks up the next scheduled event, takes the information from that event, and posts about it to @everyone in the pings channel.
  3. When your Twitch stream has been offline for half an hour, the bot will mark it as completed. (If you have a few stream hiccups, it won't act as if a *new* event has started.)

After you add Ventbot to a server, it initiates a DM thread with the server's owner to get all the info it needs (ping channel ID and Twitch username).



To implement:
  - customizable pings (maybe you want to tag a custom role, not @everyone)
  - customizable timeout for event end
  - reinitialize settings (via DM with Ventbot)
  - rework how setup works probably