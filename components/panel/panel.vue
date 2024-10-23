<template>
	<component
		class="h"
		ref="header"
		:is="targetName"
		:style="{
			'--bindColor': color
		}"
	>
		<div class="bg" aria-hidden="true">
			<div class="heart"></div>
			<img
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAYAAAAkjjtxAAAFfklEQVRYhb2Y348TVRTHP+32x273F4UVVASDEYoGjWKEID4Yn3zxHxAE0cQEE198rW9mX/XJrDEaQYQXNDHRB16Mv8AsEBVx0TSAEeTXAsvS7q+22/aab++0O9NOZ8su7EkmTe/ce+czZ875njMTMsZwl60DCAExoA9IONtngRwwu6jLCXiRR9gYEzfG7DTGHDPz27AxZvdCr7kY2B3GmKNtALay15cKuF1P3hPo5hgezPjHTjr1KrAX2BYcY85vqQLFCsw6A/GwPcKhxhW7GMwcaLlfOuX5Gwm8uF2wwwHd3nJO2cBMGbKzcKMIN4uQm4WpEpQd2Ac7YX0PrIxDxAOtvVsDN1gwcDr1BvCJ7zk5rlC2gBen4cI0jBVhumxvoFF8/p2G6wV4YQAG4lZHrG0jnYowmCktHDjIqwIR1OUZ+HvCwk6WoTKPPOr8+SlI9cCyKETD7rOSwAUCp1O7gX2+s/NluJSH01nrMYXBnVg1dCrN3rfa3ZY1AvvDlgyM5uFUFs5OWg8vpN50RyAZhY6mxGu7mLiBd/rCTpbgzAT8ehvGiwugdOpeogOe7ocHOv2Ai6RTNkYGM5XArVyydgx4rn5GMadsPz5uY3U2cB8vXCQMXR3QG4G+CKyIweouqxQa9/Iec363u/4PMZg5WP3XIGs1YCXZF/VRDV3Lw/c3bfbPl1ACUBItj8JDAuuCgZiFjYWtR0OhRtD57HgVHPa759VCYq9nscLgxHh7sJ0dsLoTHuuFNV3Wq/LwncH52VbnwA0t4HCTfN0owD9TwbDy6MNd8ES/Be2J3A1IP6vl1X438JwZx8OFFjGr0npfDJ5Jwvpum/mLAZVTpDr5it1HMd7ZVML3uoGb3ZhwYq9RZzW2sRe2JC10c18wZ5dmrLJozsv3+4PmSvZJStMnShZ0TcI6YoVn/61Onh2sJZ1XIbT46Bj8mbPqoHV9UdjcD0/228fvZ5cdyJGcdYPm+sGqx1DV+z0LowWvAmnvzcvstbo91xHj87WRIQ+wFsmLalRuFa1n1yasLMW9EVS1GqhuEHT1GWCMrcnl2q0+T5VO+TE8bgtQ0SfsFI4q9xt6GoGVZ+HaiCTtrXrrKI8uj1lwtYmSpZhvawjfXFOp1pWngbPAL8AJXlmzlpXx9+rzFAI1qRRQkPiUfJonx9y3MOTpdUOuHtbPbIwaRnK3gWHgS+Bn+VtdB+sSP3lWKbFGJuC/mWBYOWdVHLqb2guFRMUNXOtJPw/YztqRUcHKoz846wQ3iu1+ccqsVyqnynA1HyyVeoLrErCpz5Zyr8mhTc3PASomzHT5XXoijzZtqFj9LVvmdHYE+BD4FrheBw0yg18PMWf9UQuqo7lBOiGFoKGXsDaYkXdeIhw6QDSUJBoOVZNFulwxk8BXwAfAX4FdVjp11ONlKc/JcasMedf9SXeVYFIGSWXUNwT31AqInz4pgf6gYg5TMDspVLqdsYvAx87Ca7767TU9wjlgPWKVb+PEv6RMiS1df6TbarC/7XF3ka1eQhVACokXgQ0SG+BH4KTzQaQ9S6fUwGypzy07VU3xLHKpkDzsFyrFygjR8PuE+Mw93OqdTjueA67qoVX7VZho9zXGZUMeYIGpOQrqOyR9ZybOMXxrF3CqVXt5L+018HqppVn1KQCf6lmTTl1pnDr/a/7ibR+GELOVd4iFN/nudiVvK+VpfSfgO0cRbvpNXQoPKy8UAE/xbPIQj/durDb5uBqkkZwgLgCHHNhzpFO+72NLA2yhVwNvA28SIlkdM1XNGAe+Bj4CzpBOTQdtsxQhUbMbwOFq/22qjVaP03tI14+QTt1uZ5Ol87BsMKMPJgPAKqdbkQqNtXr8ftb+x8C7a6oSuvD83nLLGvA/ljutLV+xCPkAAAAASUVORK5CYII="
				alt="left-cat"
				class="left-cat"
			/>
			<img
				src="data:image/png;base64,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"
				alt="right-car"
				class="right-car"
			/>
			<div class="line-border">
				<img :src="lineImg" alt="line" class="line" />
			</div>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</component>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	targetName?: string;
	color?: string;
}

const { targetName = "h2", color = "#f17559" } = defineProps<Props>();

const lineImg = ref(
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAAUCAYAAADFugKNAAAEnUlEQVR4nO2b3YocRRTHf92z2c3qRBPF3AheCDreeOGVhuTSPEU0CKKg+AZ7nWdYhBBJopeCEB8h0QRCciMhgQgKiuDHxiSyX7PTJbXTtXv69Kmens0y27D1h6Gnq06fr6rTXed0deacowE50CuPB4miAzpYCHrJI/ukq7Q5Zn8X/TKtL7pkQyZ0GZY/E3OR9nPAZ8Dp2eibkNBJ3ASWgStaOeuJ8ynwZRrHhIQd3C4D6FJo0IGTgiYhIY6PQ/DIwLGDpnDQmAbNAH7ledA6WAh6ySP7pKu0OWZ/F/0yrS+6ZkNRKtPLIM8sio+AyyFwfE7zdaV7s4C/NuC3dXg8hGExTuMsx2gnWX0oGkQKqZ1n6dvE25JjXa91131t2iwdXQsbnLK3Sa7FX/Ntsr8NjyaamJ+0nrFxp4W/A32mfGLxt84n6aTPYwEaaEYO1kewXsBcBq8uwqAPryyMz3dxC3gvBM71SiHAB839p/DjCjwajpkmJBw2nFyAsyfhtUX99JnPy/tgtXr27xDuPoZ/NlPQJBxe+BXXT09gbaRd8HJeewD6OPlvC54Mu5lXJCTMCn7+r2yOl29VHM9rKz8fRgs5HOni+8aEhBnjaE/nOB7rIV29UWk+MQ9vHRtflJBwWPFcD97sj49V/Bl2DixX8pzFHrzzIhybg19W4dEmbImy9H5UPCbBqtTMAm0qXdNUnPbS3lSR2otPp/V9WzzruE/T18ane5VFWYb2RTF/9KVo//B4+wV4o69XX3eAVfke5wfgVEWQL0H7xMgzHEUU1GU+s4bvIMsMZ5TtMeNkf1YaF84nOXKSbC1j2kkoZVjvW6yJX/ONkq3LtLp9Unnfeq9k+VjTW8gM38RuIE3l/LY3wGcJ7mmCrJ6c7MLPdz/X53Lo98YPjnrK8glwUQbOh9aenISEhB34lOYMalfqVeB88lFCQhTLoUM/h67iOM/a6F7yXUJCiWHh85oPgG9CU3139IUHfnX4Lnn2FUeyAUd72fZ7Up8wba95qS5ea+vc8mT7XK6tw3rZCXrJ0+LbRC/kgMGjQfZOe9DR2fzMfEXaJ2Wi5DqD1vDNTg4iro19IxVsqNmr7NSDUvNxxQG2rIrPtE9d3XeWXpX8yhqrinHV5KNtgaQiS4+pvl7TKTY+n/FzfejG7zKfbsFW8T2OL1ga/CpJ69/jLA0cFx78TOG+ZcN9zkZx/ABqWwkJXcDfwHd+D4HWJfYh24qvHAC/A+8Dr/sitaj3ZGprXhbZromiiW2zw7i/1GpzBr1sM26LJp3FW55bdRfZ79QXjpquqXYTq5HpdvlVqa5Z0tLvErnQvan+FSvs1mp1ah5g8JU2axpdm7Tk5eo6y1Zd39TzUsuy+sJ1Phb6/rnjd2sCD8u8/xpLg9WaUcZSLfzzij8PvFQynBeCpbJygLUzQg7l20bGfuge1UK3nkCyvyiNGxlyMHhkDbJRMooIPyuow/9C2Udk8rkG30jd5LVFZELryYSyR49FkKN9LO2PTfhC+F/rJ20I7ZZe0kfWWEno4J9msaaDSt5wYnPB4uvnu5/ra8Af5YPD/3csDXapgP8BobcMX0ts2UAAAAAASUVORK5CYII="
);
</script>

<style scoped>
@layer components.panel {
	.h {
		display: inline-block;
		position: relative;
		margin-block: 4px;
		block-size: 54px;
		padding-inline: 26px 24px;

		& > .bg {
			position: absolute;
			inset: 0;

			& > .heart {
				position: absolute;
				top: 2px;
				left: 2px;
				width: 20px;
				height: 20px;

				background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAIAAABuP+aXAAADf0lEQVRYhe2Xz0v6YBzHp00zAzFiJK6TQrCiqEBKcBAEBUaSNPISnboHQtS9U1BBUFCJEBRmBB08dIgo/4S67FbRLwxSjEoonXu+fBvIfJ65Z37b6PJ93/bss+f92vM872fPTAAA4ldl/l37/wTfInXs6/T09Pj4OJvNlkolu93ucrkikcjg4CDmMaCH4vF4f39/Q0MD1LnNZvP5fIeHhyoePyUQBIHjOIvFovKSNpttZmZGEATFHvBpfHt7S6fTNzc35XK5t7c3EAg0NjZW7k5NTR0dHeFn6LsymUyaTKY6ZmF/f39oaKi1tVVeT9P05OTk7e0tAGB3d9dqtWqx/7viSHJ9fV3rLOTz+ZGREZXe29vbk8lkIBDQaC/J6/V+fX3hCV5eXrq7u7HdURTlcDjqIiAIYnV1FUMgCAI+Pz/Q6OgohmBpaUlhseinjo4OURRrEoiiyDCMcfYEQbS1tamNwdnZmdls7D7d0tICjUGVXyqVEkXRUAKr1QpZVBG8vr4aak8QhMPhgIa56sLQNSiJpmnIpYrAbrcbTYDuNFUEhu4EBEFYLJbp6Wm4Vb4sC4WCy+UyjqCrqwv9QsKzwLKscQTBYBA9Q8B7Is/zTqfTCHu32/3x8QEQwfsPwzAcxxlBwHGc8kpHoYrFYl9fn772Ho+nUCigXjXPBw8PD16vVy97kiTj8biikdo58erqyuPx6EIwPDxcywUmKBaL8svr62stRxV10TT9/Pxc6RP6LCmMwcXFhfzy/f1dOULa1NzcnEgkUFc1Ap7nE4kE1Li8vOx2u+u1N5vNc3NzcvtSqYQnAADMzs5ubm5CjXd3d8FgsKmpSTvB+Pg49PblclkTgZTGxcVF9FYqlfL7/SSJ/9fz+XzQqvr8/EQ7xKSRZdnLy0v07t7eHvTfAqmzszOXy8kfSafTikaa0qg4GACA8/PzUChEURRkzzDM4+OjvHJra6uWC+a/sZJGlmUPDg4Ua3K53MLCwsDAgLTj9vT0PD09yQu2t7flaayPAEpjKBQ6OTmpVcnzfDQazWQy8sZYLFZ3GhUlT+PY2FgsFtPy1M7ODpTGfydA0+j3++fn5+/v72vVb2xsoGn8EYEkKI1Op3NiYmJlZSWbzVZqMplMNBpF06gPgSQ0jRRFhcPhtbW1cDhMURSaRp0JJGlPo1EEkrBpNJygIsU0YgUA+AOBit1KxKNssgAAAABJRU5ErkJggg=="),
					linear-gradient(var(--bindColor), var(--bindColor));

				background-blend-mode: lighten;
				background-size: cover;
			}

			& > .left-cat {
				position: absolute;
				top: 24px;
				left: 4px;
				width: 20px;
				height: 20px;
			}

			& > .right-car {
				position: absolute;
				top: 0px;
				right: 4px;
				width: 20px;
				height: 20px;
			}

			& > .line-border {
				position: absolute;
				left: 26px;
				right: 16px;
				bottom: 4px;
				height: 16px;

				& > .line {
					width: 100%;
					height: 100%;
					object-fit: fill;
				}
			}
		}

		& > .content {
			margin-block-start: 4px;
			min-inline-size: 4em;
			text-align: center;
			font-size: 22px;
		}
	}
}
</style>
