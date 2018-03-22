import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  canvas: HTMLCanvasElement;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('clock') as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    const center = this.canvas.height / 2;
    const radius = center * 0.90;

    ctx.translate(center, center);

    drawClock(ctx, radius);
  
    // Actualizar cada segundo
    setInterval(function () {
        drawClock(ctx, radius);
    }, 1000);

    // Función principal que dibuja el reloj
    function drawClock(ctx, radius) {
        drawFace(ctx, radius);
        drawNumbers(ctx, radius, 12, 1, 0.2, 0.85);
        // drawNumbers(ctx, radius, 60, 5, 0.1, 0.70);
        drawTime(ctx, radius);
        drawGlass(ctx, radius, 225, .5, '#999999');
    }

    function drawFace(ctx, radius) {
        var grad, x, y, w, h;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, '#999');
        grad.addColorStop(0.5, '#BBB');
        grad.addColorStop(1, '#666');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    function drawNumbers(ctx, radius, n, step, scale, offset) {
        step = step || 1;
        ctx.font = ['normal', (radius * scale) + 'px', 'arial'].join(' ');
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        for (var num = 0; num < n; num += step) {
            var angle = toRad(num * (360 / n));
            var value = num === 0 ? n : num;
            drawNumber(ctx, angle, radius, value, offset);
        }
    }

    function drawNumber(ctx, angle, radius, num, offset) {
        ctx.rotate(angle);
        ctx.translate(0, -radius * offset);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, radius * offset);
        ctx.rotate(-angle);
    }

    function drawTime(ctx, radius) {
        var now = new Date();
        var hour = now.getHours() % 12;
        var minute = now.getMinutes();
        var second = now.getSeconds();
        // Hour
        hour = toRad(hour * 30) + toRad(minute * (1 / 2)) + toRad(second * (1 / 120));
        drawHand(ctx, hour, radius, radius * 0.5, radius * 0.07, '#000', '#000');
        // Minute
        minute = toRad(minute * 6) + toRad(second * (1 / 10));
        drawHand(ctx, minute, radius, radius * 0.8, radius * 0.07, '#000', '#FFF');
        // Second
        second = toRad(second * 6);
        drawHand(ctx, second, radius, radius * 0.9, radius * 0.02, '#F00');

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.025, 0, 2 * Math.PI);
        ctx.fillStyle = '#F00';
        ctx.fill();
    }

    function drawHand(ctx, pos, radius, length, width, color, color2 = null) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color || '#000000';
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();

        if (color2 != null) {
            ctx.beginPath();
            ctx.lineWidth = width / 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color2 || '#FFFFFF';
            ctx.moveTo(0, -radius * 0.12);
            ctx.lineTo(0, -length * 0.99);
            ctx.stroke();
        }

        ctx.rotate(-pos);
    }

    function drawGlass(ctx, radius, angle, magnitude, color) {
        var size = radius * 0.95;
        var offX = Math.cos(toRad(angle)) * size * magnitude;
        var offY = Math.sin(toRad(angle)) * size * magnitude;

        // Create gradient
        var grd = ctx.createRadialGradient(offX, offY, 0, 0, 0, radius);

        // Add colors
        grd.addColorStop(0.000, 'rgba(255, 255, 255, 0.795)');
        grd.addColorStop(0.100, 'rgba(255, 255, 255, 0.750)');
        grd.addColorStop(0.600, 'rgba(255, 255, 255, 0.300)');
        grd.addColorStop(0.750, 'rgba(255, 255, 255, 0.500)');
        grd.addColorStop(1.000, 'rgba(200, 200, 200, 0.702)');

        // draw circle which will be stretched into an oval
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI, false);

        // apply styling
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.900)';
        ctx.stroke();
    }

    function toRad(degrees) {
        return degrees * (Math.PI / 180);
    }
  }
}
      