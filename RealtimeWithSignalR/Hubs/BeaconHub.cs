using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RealtimeWithSignalR.Hubs
{
    public class BeaconHub : Hub
    {
        public async Task MoveBeacon()
        {
            Random random = new Random();
            int x = random.Next(30, 500);
            int y = random.Next(30, 500);
            await Clients.All.SendAsync("beaconMoved", x, y);
        }
    }
}
