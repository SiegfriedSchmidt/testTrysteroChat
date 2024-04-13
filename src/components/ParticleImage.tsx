import {CanvasHTMLAttributes, FC, useEffect, useRef} from 'react';

function Random(max: number) {
  return Math.random() * max
}

class Draw {
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  Rect(x: number, y: number, s: number) {
    this.ctx.fillRect(x, y, s, s)
  }

  Color(c: string) {
    this.ctx.fillStyle = c
  }
}

class Particle {
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;
  private readonly s: number
  private readonly c: string;
  private readonly speed: number;
  private readonly draw: Draw;

  constructor(x: number, y: number, dx: number, dy: number, s: number, c: string, speed: number, draw: Draw) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.s = s
    this.c = c
    this.speed = speed
    this.draw = draw
  }

  move() {
    this.x += (this.dx - this.x) * this.speed
    this.y += (this.dy - this.y) * this.speed
  }

  render() {
    this.move()
    this.draw.Color(this.c)
    this.draw.Rect(this.x, this.y, this.s)
  }
}

class Effect {
  public particles: Particle[];
  private pixels: Uint8ClampedArray;

  constructor(
    private readonly height: number,
    private readonly width: number,
    private readonly gap: number,
    private readonly speed: number,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly draw: Draw,
    private readonly mode: boolean
  ) {
    this.height = height
    this.width = width
    this.gap = gap
    this.speed = speed
    this.particles = []
    this.pixels = new Uint8ClampedArray()
    this.ctx = ctx
    this.draw = draw
    this.mode = mode
  }

  initParticles(image: HTMLImageElement) {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(image, 0, 0, this.width, this.height)
    this.pixels = this.ctx.getImageData(0, 0, this.width, this.height).data
    for (let x = 0; x < this.width; x += this.gap) {
      for (let y = 0; y < this.height; y += this.gap) {
        const index = (y * this.width + x) * 4
        const green = this.pixels[index]
        const blue = this.pixels[index + 1]
        const red = this.pixels[index + 2]
        const alpha = this.pixels[index + 3]
        if (Math.max(green, blue, red, alpha)) {
          let color = `rgba(${green}, ${blue}, ${red}, ${alpha / 255})`
          if (this.mode) {
            const av = (green + blue + red) / 3 * 2
            color = `rgba(${av}, 0, 0, ${alpha / 255})`
          }

          this.particles.push(new Particle(
            Random(this.ctx.canvas.width),
            Random(this.ctx.canvas.height),
            x + (this.ctx.canvas.width - this.width) / 2,
            y + (this.ctx.canvas.height - this.height) / 2,
            this.gap,
            color, this.speed, this.draw))
        }
      }
    }
    if (this.particles.length === 0) setTimeout(() => {
      console.log('empty particles')
      this.initParticles(image)
    }, 1000)
  }

  Update() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.particles.forEach(p => p.render())
  }
}

function pushParticles(x: number, y: number, d: number, effect: Effect) {
  effect.particles.forEach(p => {
    const distance = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2)
    if (distance < d) {
      const vx = (p.x - x) / distance * (d - distance)
      const vy = (p.y - y) / distance * (d - distance)
      p.x += vx
      p.y += vy
    }
  })
}

interface ParticleImageProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  imageUrl: string
  imageWidth: number
  imageHeight: number
  gap: number
  pushD: number
  mode?: boolean
  setPushImage?: (func: () => void) => void
}

const ParticleImage: FC<ParticleImageProps> =
  ({
     imageUrl,
     imageWidth,
     gap,
     pushD,
     imageHeight,
     mode = false,
     setPushImage,
     ...props
   }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const requestRef = useRef(0)
    const speed = 0.02

    function Update(effect: Effect) {
      effect.Update()
      requestRef.current = requestAnimationFrame(() => {
        Update(effect)
      });
    }

    useEffect(() => {
      const canvas = canvasRef.current as HTMLCanvasElement
      const image = imageRef.current as HTMLImageElement
      const ctx = canvas.getContext('2d', {willReadFrequently: true}) as CanvasRenderingContext2D
      const draw = new Draw(ctx)
      const effect = new Effect(imageHeight, imageWidth, gap, speed, ctx, draw, mode)
      effect.initParticles(image)
      Update(effect)
      canvas.addEventListener('mousemove', (e) => {
        pushParticles(e.offsetX, e.offsetY, pushD, effect)
      })

      if (setPushImage) {
        setPushImage(() => {
          effect.particles.forEach(particle => {
            particle.dx += Random(2) - 1;
            particle.dy += Random(2) - 1;
          })
        })
      }

      return () => cancelAnimationFrame(requestRef.current);
    })

    return (
      <div>
        <img ref={imageRef} src={imageUrl} alt="logo" hidden/>
        <canvas ref={canvasRef} {...props}></canvas>
      </div>
    );
  };

export default ParticleImage;