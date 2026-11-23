import type { APIRoute } from 'astro';
import { events, isUpcoming } from '../../../data/events';
import { ics } from '../../../lib/calendar';

// /tr/events/<slug>.ics for every upcoming event with a date.
export const getStaticPaths = () => events.filter((e) => e.date && isUpcoming(e)).map((e) => ({ params: { slug: e.slug }, props: { e } }));

export const GET: APIRoute = ({ props }) =>
  new Response(ics(props.e, 'tr'), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
