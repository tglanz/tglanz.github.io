---
title: Climate Introduction
description: |
  Fundamental concepts in physical climatology
categories:
- Climate
tags:
- Climate
- Atmospheric Science
- Physical Climatology
- Thermodynamics
toc: false
---

## Temperature

### Lapse Rate

The lapse rate is defined as the rate at which atmospheric temperature decreases with increasing altitude. It is formally expressed as:

$$
\Gamma = -\frac{dT}{dz}
$$

where $T$ is temperature and $z$ is altitude. The lapse rate is positive when temperature decreases with height, which is the typical behavior in the troposphere.

![Atmospheric Temperature Profile](/gpc/Fig-1-2.png "Atmospheric temperature lapse rate")

### Tropospheric Lapse Rate

The troposphere extends from the surface to approximately 10-15 km altitude. In this layer, temperature generally decreases with height at a rate that varies depending on atmospheric conditions.

The dry adiabatic lapse rate, which applies to unsaturated air parcels undergoing adiabatic (no heat exchange with surroundings) expansion, is given by:

$$
\Gamma_d = \frac{g}{c_p}
$$

where $g$ is gravitational acceleration and $c_p$ is the specific heat capacity (energy required to raise temperature per unit mass) at constant pressure.

> The environmental lapse rate in the troposphere typically ranges from 6 to 7 K/km, though it varies with location, time, and atmospheric conditions.

### Zonal Variation of Temperature Profiles

The vertical temperature structure varies considerably across different latitudes, reflecting fundamental differences in radiative forcing (net energy input from radiation) and atmospheric dynamics. This zonal variation is primarily driven by the latitudinal gradient in solar radiation receipt, with equatorial regions receiving substantially more solar energy per unit area than polar regions due to Earth's spherical geometry.

![Zonal Temperature Profiles](/gpc/Fig-1-3.png "Vertical temperature profiles at different latitudes")

The equatorial troposphere (troposphere at equatorial latitudes) extends to greater heights compared to polar regions, a consequence of intense solar heating driving vigorous convective motion (vertical transport of heat by fluid motion). This deep convection redistributes heat vertically and maintains a relatively warm temperature profile throughout the troposphere.

At high latitudes, the reduced solar input results in a shallower, colder troposphere. The tropopause height varies from approximately 16-18 km at the equator to 8-10 km at the poles. Additionally, proximity to large ocean masses moderates temperature profiles through ocean-atmosphere heat exchange, while continental regions exhibit more extreme vertical temperature gradients due to the lower heat capacity of land surfaces.

### Seasonal Variation of Temperature Profiles

Temperature profiles also exhibit significant temporal variability, particularly at high latitudes where seasonal changes in solar radiation are most pronounced. The seasonal cycle at 80N demonstrates substantial structural changes in the atmospheric temperature distribution throughout the year.

![Seasonal Temperature Profiles at 80N](/gpc/Fig-1-4.png "Temperature profiles at 80N across different seasons")

During the polar winter (January), the absence of solar radiation leads to extreme cooling near the surface and a particularly shallow troposphere. As the year progresses through spring (April) and summer (July), increased insolation warms the lower atmosphere and deepens the troposphere. By autumn (October), the temperature structure transitions back toward winter conditions.

The magnitude of seasonal variation at high latitudes is influenced by several factors. The high albedo (reflectivity of a surface) of snow and ice cover enhances cooling during winter by reflecting incoming radiation. Ocean fraction plays a crucial role: regions with greater ocean coverage experience moderated seasonal swings due to the ocean's large heat capacity, which stores heat in summer and releases it in winter. Continental regions, by contrast, exhibit more extreme seasonal temperature variations in their vertical profiles.

## Hydrostatic Balance

### The Hydrostatic Equation

The hydrostatic balance describes the vertical force balance in the atmosphere when vertical accelerations are negligible. The equation is:

$$
\frac{dp}{dz} = -\rho g
$$

where $p$ is pressure, $z$ is altitude, $\rho$ is density, and $g$ is gravitational acceleration.

This equation states that the vertical pressure gradient balances the gravitational force per unit volume.

### Ideal Gas Law

For atmospheric applications, the ideal gas law relates pressure, density, and temperature:

$$
p = \rho R_d T
$$

where $R_d$ is the specific gas constant for dry air.

### Connecting Balance and State

Combining the hydrostatic equation with the ideal gas law allows us to express the pressure variation with altitude in terms of temperature:

$$
\frac{dp}{dz} = -\frac{pg}{R_d T}
$$

This relationship forms the foundation for understanding atmospheric structure and stability. It demonstrates that pressure decreases exponentially with altitude in an isothermal (constant temperature) atmosphere, and the rate of decrease depends on temperature.

## Humidity

The atmospheric humidity refers to the amount of water vapor present in the air. Water vapor plays a critical role in energy transport, cloud formation, and precipitation processes.

Key measures of humidity include:
- Specific humidity: mass of water vapor per unit mass of air
- Relative humidity: ratio of actual vapor pressure to saturation vapor pressure
- Mixing ratio: mass of water vapor per unit mass of dry air

The saturation vapor pressure increases exponentially with temperature, described approximately by the Clausius-Clapeyron equation.

## Atmospheric Thermodynamics

Atmospheric thermodynamics governs energy transformations and transfers in the atmosphere. The fundamental principles include:

The first law of thermodynamics relates heat transfer to changes in internal energy and work:

$$
dQ = dU + pdV
$$

For atmospheric processes, this can be expressed per unit mass as:

$$
dq = c_v dT + p d\alpha
$$

where $q$ is heat per unit mass, $c_v$ is specific heat at constant volume, and $\alpha = 1/\rho$ is specific volume.

Adiabatic processes, where no heat is exchanged with the environment, are particularly important for understanding vertical motion and atmospheric stability.
