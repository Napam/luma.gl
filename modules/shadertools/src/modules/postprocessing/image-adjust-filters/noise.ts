// luma.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {ShaderPass} from '../../../lib/shader-module/shader-pass';

const fs = /* glsl */ `\
uniform noiseUniforms {
  float amount;
} noise;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 noise_filterColor(vec4 color, vec2 texCoord) {
  float diff = (rand(texCoord) - 0.5) * noise.amount;
  color.r += diff;
  color.g += diff;
  color.b += diff;
  return color;
}

vec4 noise_filterColor(vec4 color, vec2 texSize, vec2 texCoord) {
  return noise_filterColor(color, texCoord);
}
`;

/**
 * Noise - Adds black and white noise to the image.
 */
export type NoiseProps = {
  /**  0 to 1 (0 for no effect, 1 for maximum noise) */
  amount?: number;
};

export type NoiseUniforms = NoiseProps;

/**
 * Noise
 * Adds black and white noise to the image.
 */
export const noise = {
  props: {} as NoiseProps,
  uniforms: {} as NoiseUniforms,

  name: 'noise',
  uniformTypes: {
    amount: 'f32'
  },
  uniformPropTypes: {
    amount: {value: 0.5, min: 0, max: 1}
  },
  fs,
  passes: [{filter: true}]
} as const satisfies ShaderPass<NoiseProps, NoiseProps>;
